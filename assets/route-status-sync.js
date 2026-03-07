(function () {
  const ROUTES = [
    { id: 'R102', name: 'R102 - Toril - GE Torres', color: '#7e22ce', soft: '#f3e8ff', border: '#d8b4fe' },
    { id: 'R103', name: 'R103 - Toril - Roxas', color: '#f97316', soft: '#ffedd5', border: '#fdba74' },
    { id: 'R402', name: 'R402 - Mintal - GE Torres', color: '#2563eb', soft: '#dbeafe', border: '#93c5fd' },
    { id: 'R403', name: 'R403 - Mintal - Roxas', color: '#16a34a', soft: '#dcfce7', border: '#86efac' },
    { id: 'R503', name: 'R503 - Bangkal - Roxas', color: '#ca8a04', soft: '#fef9c3', border: '#fde047' },
    { id: 'R603', name: 'R603 - Buhangin - Roxas', color: '#db2777', soft: '#fce7f3', border: '#f9a8d4' },
    { id: 'R763', name: 'R763 - Panacan (via Buhangin)', color: '#16a34a', soft: '#dcfce7', border: '#86efac' },
    { id: 'R783', name: 'R783 - Panacan (via Angliongto)', color: '#ea580c', soft: '#ffedd5', border: '#fdba74' },
    { id: 'R793', name: 'R793 - Panacan (via R Castillo)', color: '#2563eb', soft: '#dbeafe', border: '#93c5fd' }
  ];

  const STORAGE_KEY = 'dc-bus-route-status-v1';

  function createDefaultState() {
    return ROUTES.reduce((state, route) => {
      state[route.id] = {
        onRoute: false,
        lastUpdated: null,
        coords: null
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

      normalized[route.id] = {
        onRoute: Boolean(nextState && nextState.onRoute),
        lastUpdated: nextState && typeof nextState.lastUpdated === 'string' ? nextState.lastUpdated : null,
        coords: sanitizeCoords(nextState && nextState.coords)
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

  function getRouteMeta(routeId) {
    return ROUTES.find((route) => route.id === routeId) || null;
  }

  function setRouteOnRoute(routeId, onRoute, extras) {
    const currentState = readState();

    if (!currentState[routeId]) {
      return null;
    }

    currentState[routeId] = {
      onRoute: Boolean(onRoute),
      lastUpdated: new Date().toISOString(),
      coords: onRoute ? sanitizeCoords(extras && extras.coords) || currentState[routeId].coords : null
    };

    return writeState(currentState)[routeId];
  }

  function setAllRoutesOnRoute(onRoute, extras) {
    const currentState = readState();
    const coords = sanitizeCoords(extras && extras.coords);
    const timestamp = new Date().toISOString();

    Object.keys(currentState).forEach((routeId) => {
      currentState[routeId] = {
        onRoute: Boolean(onRoute),
        lastUpdated: timestamp,
        coords: onRoute ? coords : null
      };
    });

    return writeState(currentState);
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
      label: onRoute ? 'On-Route' : 'Off-Route',
      lastUpdated: state ? state.lastUpdated : null,
      coords: state ? state.coords : null
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
    storageKey: STORAGE_KEY,
    readState,
    writeState,
    getRouteMeta,
    getDisplayState,
    setRouteOnRoute,
    setAllRoutesOnRoute,
    touchActiveRoutes,
    subscribe
  };
})();