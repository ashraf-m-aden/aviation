<template>
  <div class="row">
    <div class="col-sm-12 align-items-center text-center">
      <div class="map align-items-center text-center">
        <div id="map"></div>
      </div>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import { Icon } from "leaflet";
export default {
  mounted() {
    delete Icon.Default.prototype._getIconUrl;
    Icon.Default.mergeOptions({
      iconRetinaUrl: import("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: import("leaflet/dist/images/marker-icon.png"),
      shadowUrl: import("leaflet/dist/images/marker-shadow.png"),
    });
    var map = L.map("map").setView([11.5532, 43.1503], 15);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
    }).addTo(map);
    var marker = L.marker([11.553, 43.1501]);
    marker.addTo(map).bindPopup("Autorité de l'Aviation Civile de Djibouti");
  },
};
</script>

<style lang="scss" scoped>
.map-container {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  bottom: 0;
}
.map {
  max-width: 1000px;
  margin: 0 auto;
  height: 500px;
}

@media (min-width: 500px) and (max-width: 769px) {
  .map {
    max-width: 1000px;
    margin: 0 auto;
    height: 500px;
  }
}

.map-frame {
  height: 100%;
}

#map {
  width: 100%;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: 0;
}
</style>
