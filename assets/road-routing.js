(function () {
  const OSRM_BASE_URL = 'https://router.project-osrm.org/route/v1/driving/';
  const routeCache = new Map();

  function normalizePoints(points) {
    if (!Array.isArray(points)) {
      return [];
    }

    return points
      .map((point) => {
        if (!Array.isArray(point) || point.length < 2) {
          return null;
        }

        const lat = Number(point[0]);
        const lng = Number(point[1]);

        if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
          return null;
        }

        return [lat, lng];
      })
      .filter((point) => point !== null);
  }

  function clonePoints(points) {
    return points.map((point) => [point[0], point[1]]);
  }

  function buildCacheKey(points) {
    return points.map((point) => `${point[0].toFixed(6)},${point[1].toFixed(6)}`).join('|');
  }

  async function requestRoadPath(points) {
    const coordinates = points.map((point) => `${point[1]},${point[0]}`).join(';');
    const url = `${OSRM_BASE_URL}${coordinates}?overview=full&geometries=geojson&steps=false&annotations=false&continue_straight=true`;

    const response = await fetch(url, {
      headers: {
        Accept: 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Routing request failed with status ${response.status}`);
    }

    const payload = await response.json();
    const geometry = payload && payload.routes && payload.routes[0] && payload.routes[0].geometry;
    const roadPath = geometry && Array.isArray(geometry.coordinates)
      ? geometry.coordinates
          .map((point) => {
            if (!Array.isArray(point) || point.length < 2) {
              return null;
            }

            return [Number(point[1]), Number(point[0])];
          })
          .filter((point) => point && Number.isFinite(point[0]) && Number.isFinite(point[1]))
      : [];

    if (roadPath.length < 2) {
      throw new Error('Routing response did not contain a usable geometry.');
    }

    return roadPath;
  }

  async function getRoadPath(rawPoints) {
    const points = normalizePoints(rawPoints);

    if (points.length < 2) {
      return clonePoints(points);
    }

    const cacheKey = buildCacheKey(points);
    const cachedValue = routeCache.get(cacheKey);

    if (cachedValue) {
      const cachedPath = Array.isArray(cachedValue) ? cachedValue : await cachedValue;
      return clonePoints(cachedPath);
    }

    const requestPromise = requestRoadPath(points).catch(() => clonePoints(points));
    routeCache.set(cacheKey, requestPromise);

    const roadPath = await requestPromise;
    routeCache.set(cacheKey, roadPath);

    return clonePoints(roadPath);
  }

  window.dcBusRoadRouting = {
    getRoadPath,
    buildCacheKey
  };
})();
