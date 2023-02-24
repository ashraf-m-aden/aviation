<template>
  <div class="row">
    <div style="height: 600px; width: 800px">
      <l-map ref="map" v-model:zoom="zoom" :center="[11.5532, 43.1503]">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
        <l-marker :lat-lng="[11.553, 43.1501]">
          <l-icon :icon-url="iconUrl" :icon-size="iconSize" />
          <l-popup> Autorité de l'Aviation Civile de Djibouti </l-popup>
        </l-marker>
      </l-map>
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import {
  LMap,
  LTileLayer,
  LIcon,
  LMarker,
  LPopup,
} from "@vue-leaflet/vue-leaflet";
export default {
  components: {
    LMap,
    LTileLayer,
    LIcon,
    LMarker,
    LPopup,
  },
  mounted() {
    // delete Icon.Default.prototype._getIconUrl;
    // Icon.Default.mergeOptions({
    //   iconRetinaUrl: import("leaflet/dist/images/marker-icon-2x.png"),
    //   iconUrl: import("leaflet/dist/images/marker-icon.png"),
    //   shadowUrl: import("leaflet/dist/images/marker-shadow.png"),
    // });
    // var map = L.map("map").setView([11.5532, 43.1503], 15);
    // L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    //   attribution:
    //     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    //   maxZoom: 18,
    //   id: "mapbox/streets-v11",
    //   tileSize: 512,
    //   zoomOffset: -1,
    // }).addTo(map);
    // var marker = L.marker([11.553, 43.1501]);
    // marker.addTo(map).bindPopup("Autorité de l'Aviation Civile de Djibouti");
  },
  data() {
    return {
      zoom: 17,
      iconWidth: 40,
      iconHeight: 40,
    };
  },
  computed: {
    iconUrl() {
      return `https://icons-for-free.com/iconfiles/png/512/map+marker+icon-1320166582858325800.png`;
    },
    iconSize() {
      return [this.iconWidth, this.iconHeight];
    },
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
