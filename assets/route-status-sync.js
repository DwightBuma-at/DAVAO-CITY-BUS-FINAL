(function () {
  const ROUTES = [
    { id: 'R102', name: 'R102 - Toril - GE Torres', color: '#7e22ce', soft: '#f3e8ff', border: '#d8b4fe', defaultLoad: 'Available' },
    { id: 'R103', name: 'R103 - Toril - Roxas', color: '#f97316', soft: '#ffedd5', border: '#fdba74', defaultLoad: 'Available' },
    { id: 'R402', name: 'R402 - Mintal - GE Torres', color: '#2563eb', soft: '#dbeafe', border: '#93c5fd', defaultLoad: 'Standing' },
    { id: 'R403', name: 'R403 - Mintal - Roxas', color: '#16a34a', soft: '#dcfce7', border: '#86efac', defaultLoad: 'Full' },
    { id: 'R503', name: 'R503 - Bangkal - Roxas', color: '#ca8a04', soft: '#fef9c3', border: '#fde047', defaultLoad: 'Available' },
    { id: 'R603', name: 'R603 - Buhangin - Roxas', color: '#db2777', soft: '#fce7f3', border: '#f9a8d4', defaultLoad: 'Standing' },
    { id: 'R763', name: 'R763 - Panacan (via Buhangin)', color: '#16a34a', soft: '#dcfce7', border: '#86efac', defaultLoad: 'Available' },
    { id: 'R783', name: 'R783 - Panacan (via Angliongto)', color: '#ea580c', soft: '#ffedd5', border: '#fdba74', defaultLoad: 'Standing' },
    { id: 'R793', name: 'R793 - Panacan (via R Castillo)', color: '#2563eb', soft: '#dbeafe', border: '#93c5fd', defaultLoad: 'Available' }
  ];

  const PASSENGER_LOAD_VALUES = ['Available', 'Standing', 'Full'];
  const ROUTE_PERIODS = ['AM', 'PM'];

  const STORAGE_KEY = 'dc-bus-route-status-v1';

  function normalizeActivePeriod(value, fallback) {
    if (typeof value === 'string' && ROUTE_PERIODS.includes(value)) {
      return value;
    }

    if (typeof fallback === 'string' && ROUTE_PERIODS.includes(fallback)) {
      return fallback;
    }

    return null;
  }

  function normalizePassengerLoad(value, fallback) {
    if (typeof value === 'string' && PASSENGER_LOAD_VALUES.includes(value)) {
      return value;
    }

    if (typeof fallback === 'string' && PASSENGER_LOAD_VALUES.includes(fallback)) {
      return fallback;
    }

    return PASSENGER_LOAD_VALUES[0];
  }

  function getRouteMeta(routeId) {
    return ROUTES.find((route) => route.id === routeId) || null;
  }

  function getRouteDefaultLoad(routeId) {
    const routeMeta = getRouteMeta(routeId);
    return normalizePassengerLoad(routeMeta && routeMeta.defaultLoad, PASSENGER_LOAD_VALUES[0]);
  }

  function createDefaultState() {
    return ROUTES.reduce((state, route) => {
      state[route.id] = {
        onRoute: false,
        activePeriod: null,
        lastUpdated: null,
        coords: null,
        passengerLoad: normalizePassengerLoad(route.defaultLoad, PASSENGER_LOAD_VALUES[0])
      };
      return state;
    }, {});
  }

  function sanitizeCoords(coords) {
    if (!coords || typeof coords !== 'object') {
      return null;
    }

    const lat = Number(coords.lat);
    const lng = Number(coords.lng);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return null;
    }

    return { lat, lng };
  }

  function normalizeState(rawState) {
    const defaults = createDefaultState();

    if (!rawState || typeof rawState !== 'object') {
      return defaults;
    }

    const normalized = { ...defaults };

    ROUTES.forEach((route) => {
      const nextState = rawState[route.id];
      const defaultLoad = normalizePassengerLoad(route.defaultLoad, PASSENGER_LOAD_VALUES[0]);
      const nextOnRoute = Boolean(nextState && nextState.onRoute);

      normalized[route.id] = {
        onRoute: nextOnRoute,
        activePeriod: nextOnRoute
          ? normalizeActivePeriod(nextState && nextState.activePeriod, 'AM')
          : null,
        lastUpdated: nextState && typeof nextState.lastUpdated === 'string' ? nextState.lastUpdated : null,
        coords: sanitizeCoords(nextState && nextState.coords),
        passengerLoad: normalizePassengerLoad(nextState && nextState.passengerLoad, defaultLoad)
      };
    });

    return normalized;
  }

  function readState() {
    try {
      return normalizeState(JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}'));
    } catch (error) {
      return createDefaultState();
    }
  }

  function writeState(nextState) {
    const normalized = normalizeState(nextState);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  }

  function setRouteOnRoute(routeId, onRoute, extras) {
    const currentState = readState();

    if (!currentState[routeId]) {
      return null;
    }

    const nextOnRoute = Boolean(onRoute);
    const nextPeriod = nextOnRoute
      ? normalizeActivePeriod(extras && extras.period, currentState[routeId].activePeriod || 'AM')
      : null;

    currentState[routeId] = {
      onRoute: nextOnRoute,
      activePeriod: nextPeriod,
      lastUpdated: new Date().toISOString(),
      coords: nextOnRoute ? sanitizeCoords(extras && extras.coords) || currentState[routeId].coords : null,
      passengerLoad: normalizePassengerLoad(currentState[routeId].passengerLoad, getRouteDefaultLoad(routeId))
    };

    return writeState(currentState)[routeId];
  }

  function setAllRoutesOnRoute(onRoute, extras) {
    const currentState = readState();
    const coords = sanitizeCoords(extras && extras.coords);
    const timestamp = new Date().toISOString();

    Object.keys(currentState).forEach((routeId) => {
      const nextOnRoute = Boolean(onRoute);

      currentState[routeId] = {
        onRoute: nextOnRoute,
        activePeriod: nextOnRoute
          ? normalizeActivePeriod(extras && extras.period, currentState[routeId].activePeriod || 'AM')
          : null,
        lastUpdated: timestamp,
        coords: nextOnRoute ? coords : null,
        passengerLoad: normalizePassengerLoad(currentState[routeId].passengerLoad, getRouteDefaultLoad(routeId))
      };
    });

    return writeState(currentState);
  }

  function setRoutePassengerLoad(routeId, passengerLoad, extras) {
    const currentState = readState();

    if (!currentState[routeId]) {
      return null;
    }

    const nextOnRoute = Boolean(currentState[routeId].onRoute);

    // Passenger load can only be changed while the bus is actively On-Route.
    if (!nextOnRoute) {
      return null;
    }

    currentState[routeId] = {
      onRoute: nextOnRoute,
      activePeriod: nextOnRoute
        ? normalizeActivePeriod(currentState[routeId].activePeriod, 'AM')
        : null,
      lastUpdated: new Date().toISOString(),
      coords: nextOnRoute ? sanitizeCoords(extras && extras.coords) || currentState[routeId].coords : null,
      passengerLoad: normalizePassengerLoad(passengerLoad, getRouteDefaultLoad(routeId))
    };

    return writeState(currentState)[routeId];
  }

  function touchActiveRoutes(coords) {
    const currentState = readState();
    const timestamp = new Date().toISOString();
    const cleanCoords = sanitizeCoords(coords);

    Object.keys(currentState).forEach((routeId) => {
      if (!currentState[routeId].onRoute) {
        return;
      }

      currentState[routeId].lastUpdated = timestamp;

      if (cleanCoords) {
        currentState[routeId].coords = cleanCoords;
      }
    });

    return writeState(currentState);
  }

  function getDisplayState(routeId) {
    const state = readState()[routeId];
    const onRoute = Boolean(state && state.onRoute);

    return {
      onRoute,
      activePeriod: onRoute
        ? normalizeActivePeriod(state ? state.activePeriod : null, 'AM')
        : null,
      label: onRoute ? 'On-Route' : 'Off-Route',
      lastUpdated: state ? state.lastUpdated : null,
      coords: state ? state.coords : null,
      passengerLoad: state ? normalizePassengerLoad(state.passengerLoad, getRouteDefaultLoad(routeId)) : getRouteDefaultLoad(routeId)
    };
  }

  function subscribe(callback) {
    if (typeof callback !== 'function') {
      return function noop() {};
    }

    function handleStorage(event) {
      if (event.key !== STORAGE_KEY) {
        return;
      }

      callback(readState());
    }

    window.addEventListener('storage', handleStorage);

    return function unsubscribe() {
      window.removeEventListener('storage', handleStorage);
    };
  }

  window.dcBusStatusSync = {
    routes: ROUTES.slice(),
    passengerLoadValues: PASSENGER_LOAD_VALUES.slice(),
    storageKey: STORAGE_KEY,
    readState,
    writeState,
    getRouteMeta,
    getDisplayState,
    setRouteOnRoute,
    setRoutePassengerLoad,
    setAllRoutesOnRoute,
    touchActiveRoutes,
    subscribe
  };
})();