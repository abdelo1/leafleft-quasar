<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row">
      <q-select
        filled
        v-model="model"
        use-input
        input-debounce="500"
        label="Simple filter"
        new-value-mode="add"
        :options="options"
        @filter="filterFn"
        style="width: 250px"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              <q-btn
                @click="openPopup"
                flat
                color="primary"
                icon="add"
                label="Ajouter une ville"
              />
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-select
        filled
        v-model="model"
        use-input
        hide-selected
        input-debounce="0"
        label="Hide selected"
        :options="options"
        @filter="filterFn"
        style="width: 250px"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </div>
  <q-dialog v-model="dialog">
    <q-card style="width: 300px">
      <q-card-section>
        <div class="text-h6">Ajouter une Entreprise</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          @input="
            (e) => {
              newCity = e.target.value;
            }
          "
          v-model="newCity"
          label="saisissez la entreprise"
        />
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="Ajouter" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  {{ newCity }}
</template>

<script>
import { ref, watch } from "vue";

let stringOptions = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];

export default {
  setup() {
    const options = ref(stringOptions);
    const dialog = ref(false);
    const newCity = ref("");
    const watchNewCity = watch(newCity, (newval) => {
      if (newval) {
        options.value = stringOptions = [...stringOptions, newval];
      }
    });
    return {
      model: ref(null),
      dialog,
      newCity,
      options,
      watchNewCity,
      openPopup() {
        dialog.value = true;
      },
      filterFn(val, update) {
        if (val === "") {
          update(() => {
            options.value = stringOptions;

            // here you have access to "ref" which
            // is the Vue reference of the QSelect
          });
          return;
        }

        update(() => {
          const needle = val.toLowerCase();
          options.value = stringOptions.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },
    };
  },
};
</script>
