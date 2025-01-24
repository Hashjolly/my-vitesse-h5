<script setup lang="ts">
import * as L from 'leaflet'
import { onMounted, ref } from 'vue'
// import { useGtag } from 'vue-gtag-next'

// const user = useUserStore()
// const name = ref(user.savedName)

// const router = useRouter()

// const { event } = useGtag()
const { t } = useI18n()
const poiStore = usePoiStore()
const initialMap = ref(null)

onMounted(() => {
  poiStore.fetchPois().then(() => {
    if (poiStore.pois && poiStore.pois.features) {
      initialMap.value = L.map('map').setView([44.8404400, -0.5805000], 14)
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(initialMap.value)

      navigator.geolocation.watchPosition(success, error)

      let marker: any, circle: any, zoomed: any

      function success(pos: any) {
        const lat = pos.coords.latitude
        const long = pos.coords.longitude
        const accuracy = pos.coords.accuracy

        if (marker) {
          initialMap.value.removeLayer(marker)
          initialMap.value.removeLayer(circle)
        }

        marker = L.marker([lat, long]).addTo(initialMap.value)
        circle = L.circle([lat, long], { radius: accuracy }).addTo(initialMap.value)

        if (!zoomed) {
          zoomed = initialMap.value.fitBounds(circle.getBounds())
        }

        // initialMap.value.setView([lat, long])
      }

      function error(err: any) {
        if (err.code === 1) {
          alert(t('errors.location_denied'))
        }
        else if (err.code === 2) {
          alert(t('errors.location_error'))
        }
      }

      // initialMap.locate({ setView: true, maxZoom: 16 })

      // function onLocationFound(e) {
      //   const radius = e.accuracy

      //   L.marker(e.latlng).addTo(initialMap).bindPopup(`You are within ${radius} meters from this point`).openPopup()

      //   L.circle(e.latlng, radius).addTo(initialMap)
      // }
      // initialMap.on('locationerror', onLocationError)

      // initialMap.on('locationfound', onLocationFound)

      // Exemple d'icône personnalisée
      const createCustomIcon = (imageUrl: string) =>
        L.divIcon({
          className: 'custom-marker', // Classe pour le style
          html: `
            <div class="bubble">
              <img src="${imageUrl}" alt="POI Image" />
            </div>
          `,
          iconSize: [50, 50], // Taille totale de la bulle
          iconAnchor: [25, 25], // Centre de l'icône
        })

      // Ajouter les marqueurs pour les POIs
      poiStore.pois.features.forEach((poi) => {
        if (poi.geometry.type === 'Point') {
          const imageUrl = `${poiStore.imageApiUrl}/${poi.properties.image_dir}/${poi.properties.images[0].file}`
          const coordinates = [poi.geometry.coordinates[0], poi.geometry.coordinates[1]]

          L.marker(coordinates, { icon: createCustomIcon(imageUrl) })
            .addTo(initialMap.value)
            .bindPopup(poi.properties.name)
        }
      })

      // Ajouter la polyline rouge pour l'itinéraire de bus
      const polylineCoordinates = [
        [44.837789, -0.57918], // Pont de Pierre
        [44.841225, -0.56935], // Place de la Bourse
        [44.846056, -0.573436], // Place des Quinconces
        [44.860556, -0.554167], // Pont Chaban-Delmas
        [44.864303, -0.550716], // Cité du Vin
        [44.860556, -0.554167], // Pont Jacques Chaban-Delmas
        [44.84889, -0.54868], // Bastide
        [44.837789, -0.57918], // Pont de Pierre
      ]
      const polyline = L.polyline(polylineCoordinates, { color: '#dc1b22' }).addTo(initialMap.value)

      // Ajouter les marqueurs numérotés
      polylineCoordinates.forEach((coordinates, index) => {
        const marker = L.marker(coordinates, {
          icon: L.divIcon({
            className: 'numbered-marker',
            html: `<div class="number">${index + 1}</div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          }),
          zIndexOffset: 1000, // Z-index élevé pour les marqueurs numérotés
        }).addTo(initialMap.value)
      })
    }
  })
})

function onPoiSelected(coordinates) {
  console.log(coordinates)
  initialMap.value.setView(coordinates, 14)
}

// function go() {
//   if (name.value) {
//     router.push(`/hi/${encodeURIComponent(name.value)}`)

//     event('click_go', {
//       event_label: name.value,
//       event_category: 'custom_click',
//     })
//   }
//   else {
//     event('click_go', {
//       event_label: 'null',
//       event_category: 'custom_click',
//     })
//   }
// }
</script>

<template>
  <div class="flex flex-col flex-grow items-center justify-center">
    <div id="map" class="h-50" />
    <div>
      <Carousel @poi-selected="onPoiSelected" />
    </div>
  </div>
  <!-- <div pt-4>
    <div text-4xl>
      <div i-carbon-application-mobile inline-block />
    </div>
    <p m-2>
      <a rel="noreferrer" href="https://github.com/YunLeFun/vitesse-h5" target="_blank">
        Vitesse H5
      </a>
    </p>
    <p>
      <em text-sm opacity-75>{{ t('intro.desc') }}</em>
    </p>

    <div py-4 />

    <Suspense>
      <div m="auto" max-w="800px">
        <input
          id="input"
          v-model="name"
          :placeholder="t('intro.whats-your-name')"
          :aria-label="t('intro.whats-your-name')"
          type="text"
          autocomplete="false"
          p="x4 y2"
          w="full"
          text="center"
          bg="transparent"
          border="~ rounded gray-200 dark:gray-700"
          @keydown.enter="go"
        >
        <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>

        <div>
          <button
            btn mt-4
            :disabled="!name"
            @click="go"
          >
            {{ t('button.go') }}
          </button>
        </div>
      </div>

      <template #fallback>
        <Loading />
      </template>
    </Suspense>
  </div> -->
</template>

<route lang="yaml">
meta:
  layout: home
</route>

<style>
/* Style des bulles de marqueurs */
.custom-marker .bubble {
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%; /* Forme ronde */
  overflow: hidden;
  border: 2px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-marker .bubble img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ajuste l'image pour remplir la bulle */
  border-radius: 50%; /* Assure que l'image est bien ronde */
}

.numbered-marker {
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  background-color: white;
  border: solid 3px #dc1b22;
  border-radius: 50%;
}
</style>
