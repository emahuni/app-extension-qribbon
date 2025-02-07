<template>
  <q-page class="row justify-center items-baseline qribbon-builder">
    <q-card class="q-my-lg q-py-md flat bordered relative-position" style="max-width: 800px; width: 90%">
      <div class="ribbon-wrapper">
        <q-ribbon class="border-radius" position="left" color="#616161" background-color="#e0e0e0">QRibbon Builder</q-ribbon>
      </div>

      <q-separator />

      <q-card-section class="q-pa-none q-py-md">
        <q-ribbon
          class="q-pb-md"
          :position="getPosition"
          :type="type"
          :color="color"
          :background-color="backgroundColor"
          :leaf-color="leafColor"
          :leaf-position="leafPosition"
          :size="full ? 'full' : void 0"
          :decoration="decoration"
          :glow="glow"
          :glow-speed="glowSpeed"
          :glow-iteration-count="glowIterationCount"
        >
          {{content}}
        </q-ribbon>

        <div class="q-pa-sm">
          <div class="row justify-around q-mt-lg gt-xs">
            <div class="text-center">
              Text Color
              <q-color v-model="color" no-header no-footer />
            </div>
            <div class="text-center">
              Background Color
              <q-color v-model="backgroundColor" no-header no-footer />
            </div>
            <div class="text-center">
              Leaf Color
              <q-color v-model="leafColor" no-header no-footer />
            </div>
          </div>

          <div class="row justify-around q-mt-lg xs">
            <q-input
              v-model="color"
              class="col-12 q-mt-md"
              label="Text Color"
            >
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-color v-model="color" no-header no-footer />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <q-input
              v-model="backgroundColor"
              class="col-12"
              label="Background Color"
            >
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-color v-model="backgroundColor" no-header no-footer />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <q-input
              v-model="leafColor"
              class="col-12"
              label="Leaf Color"
            >
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-color v-model="leafColor" no-header no-footer />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="row justify-around">
            <q-select
              label="Type"
              class="col-xs-12"
              v-model="type"
              map-options
              emit-value
              :options="[
                { value: 'horizontal', label: 'Horizontal (Default)' },
                { value: 'vertical', label: 'Vertical' },
                { value: 'corner', label: 'Corner' }
              ]"
            />

            <q-select
              label="Position"
              class="col-xs-12"
              v-model="position"
              map-options
              emit-value
              :options="positionOptions"
            />

            <q-select
              label="Leaf Position"
              class="col-xs-12"
              v-model="leafPosition"
              map-options
              emit-value
              :options="leafPositionOptions"
              v-if="!isCorner"
            />

            <q-select
              label="Decoration"
              class="col-xs-12"
              v-model="decoration"
              map-options
              emit-value
              :options="[
                { value: null, label: 'Default' },
                { value: 'rounded-in', label: 'Rounded In' },
                { value: 'rounded-out', label: 'Rounded Out' },
                { value: 'point-in', label: 'Point In' },
                { value: 'point-out', label: 'Point Out' }
              ]"
              v-if="!isCorner"
            />

            <q-checkbox
              v-model="full"
              label="Full?"
              class="q-pt-xs"
              v-if="!isCorner"
            />

            <q-checkbox
              v-model="glow"
              label="Glow?"
              class="q-pt-xs"
            />

            <div class="col-xs-12" v-if="glow">
              <div class="row justify-between">
                <q-input
                  v-model="glowSpeed"
                  class="col-xs-12 col-sm-5"
                  label="Glow Speed"
                  type="number"
                />

                <q-input
                  v-model="glowIterationCount"
                  class="col-xs-12 col-sm-5"
                  label="Glow Count"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-input class="col-12" :value="componentOutput" ref="componentInput" type="textarea">
          <template #prepend>
            <q-icon name="file_copy" @click="copyComponentText" />
          </template>

          <template #append>
            <q-icon name="refresh" @click="reset" />
          </template>
        </q-input>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style>
</style>

<script>
function initialState () {
  return {
    positionVal: 'left',
    leafPositionVal: 'bottom',
    type: 'horizontal',
    color: '#ffffff',
    backgroundColor: '#027BE3',
    leafColor: '',
    content: 'My Ribbon',
    full: false,
    decoration: null,
    glow: false,
    glowSpeed: 1.5,
    glowIterationCount: 'infinite'
  }
}

export default {
  name: 'InteractiveDemo',

  computed: {
    positionOptions () {
      switch (this.type) {
        case 'corner':
        case 'vertical':
          if (this.full && this.type === 'vertical') {
            return [
              { value: 'left', label: 'Left' },
              { value: 'right', label: 'Right' }
            ]
          }

          return [
            { value: 'top-left', label: 'Top Left' },
            { value: 'top-right', label: 'Top Right' },
            { value: 'bottom-left', label: 'Bottom Left' },
            { value: 'bottom-right', label: 'Bottom Right' }
          ]
        default:
          return [
            { value: 'left', label: 'Left' },
            { value: 'right', label: 'Right' }
          ]
      }
    },
    leafPositionOptions () {
      switch (this.type) {
        case 'vertical':
          return [
            { value: 'left', label: 'Left' },
            { value: 'right', label: 'Right' }
          ]
        default:
          return [
            { value: 'top', label: 'Top' },
            { value: 'bottom', label: 'Bottom' }
          ]
      }
    },
    leafPosition: {
      get () {
        return this.getLeafPosition
      },
      set (val) {
        this.leafPositionVal = val
      }
    },
    position: {
      get () {
        return this.getPosition
      },
      set (val) {
        this.positionVal = val
      }
    },
    getLeafPosition () {
      const positionOptions = this.leafPositionOptions
      const foundPosition = positionOptions.find(f => {
        console.log(f.value)
        return f.value === this.leafPositionVal
      })

      return foundPosition ? foundPosition.value : positionOptions[0].value
    },
    getPosition () {
      const positionOptions = this.positionOptions
      const foundPosition = positionOptions.find(f => {
        console.log(f.value)
        return f.value === this.positionVal
      })

      return foundPosition ? foundPosition.value : positionOptions[0].value
    },
    componentOutput () {
      const defaults = initialState()
      const leaf = this.leafColor ? ` leaf-color="${this.leafColor}"` : ''
      const type = this.type === defaults.type ? '' : ` type="${this.type}"`
      const full = this.full ? `size="full"` : ''
      const decoration = this.decoration ? ` decoration="${this.decoration}"` : ''
      const glow = this.glow ? ` glow` : ''
      const glowSpeed = !this.glow || this.glowSpeed === defaults.glowSpeed ? '' : ` glow-speed="${this.glowSpeed}"`
      const glowIterationCount = !this.glow || this.glowIterationCount === defaults.glowIterationCount ? '' : ` glow-iteration-count="${this.glowIterationCount}"`
      return `<q-ribbon${type}
        position="${this.getPosition}"
        color="${this.color}"
        background-color="${this.backgroundColor}"
        leaf-position="${this.leafPosition}"
        ${full}${leaf}${decoration}${glow}${glowSpeed}${glowIterationCount}>
            My Ribbon
        </q-ribbon>`
    },
    isCorner () {
      return this.type === 'corner'
    }
  },

  methods: {
    copyComponentText () {
      this.$refs.componentInput.select()
      document.execCommand('copy')

      this.$q.notify({
        message: 'Component has been copied to clipboard.',
        color: 'primary',
        position: 'top',
        actions: [ { icon: 'close', color: 'white' } ],
        timeout: 2000
      })
    },

    reset () {
      Object.assign(this.$data, initialState())
    }
  },

  data () {
    return initialState()
  }
}
</script>
