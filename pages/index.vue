<template>
    <div class="p-3 lg:p-52 grid grid-cols-2 gap-4">
        <div v-for="item in zozo">
            <UCard>
                <template #header>
                    <h3 class="text-center">{{ item.evseidpublic }}</h3>
                </template>
                <div>
                    <UIcon name="i-heroicons-bolt" />
                    <span> Puissance : {{ item.connectorType }}</span>
                </div>
                <div>
                    <UIcon name="i-heroicons-currency-euro" />
                    <span> Prix : 1H gratuite / {{ item.pricing }}</span>
                </div>
                <template #footer>
                    <div v-if="item.status == 'AVAILABLE'">
                        <h3 class="text-center text-green-400">DISPONIBLE</h3>
                    </div>
                    <div v-else>
                        <h3 class="text-center text-red-400">INDISPONIBLE</h3>
                    </div>

                </template>
            </UCard>
        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    middleware: 'auth'
})
const query = gql`
query fetchChargingStationDetail($cpo: ChargingStationCPO!, $locationid: String!, $evseid: String!) {
        
        fetchChargingStationDetail(cpo: $cpo, locationid: $locationid, evseid: $evseid) {
          status
          isAvailable
          evseidpublic
          connectors {
            type
            power
            pricing{
              price
            }
            }
          }
      }
`
const stations = ["FRALLEGO9006201", "FRALLEGO9006202", "FRALLEGO9006351", "FRALLEGO9006352"]
const zozo = [] as StationDetailDTO[]
for (const element in stations) {
    const variables = {
        "cpo": "ALLEGO",
        "locationid": stations[element].substring(0, stations[element].length - 1),
        "evseid": stations[element]
    }
    const { data } = await useAsyncQuery<ChargingStationResponse>(query, variables)
    if (data.value) {
        zozo.push({
            status: data.value.fetchChargingStationDetail.status,
            isAvailable: data.value.fetchChargingStationDetail.isAvailable,
            evseidpublic: data.value.fetchChargingStationDetail.evseidpublic,
            connectorType: data.value.fetchChargingStationDetail.connectors[0].power.toString() + "kW",
            pricing: data.value.fetchChargingStationDetail.connectors[0].pricing[0].price.toString() + "€"
        })
    }
}

export interface StationDetailDTO {
    status: string;
    isAvailable: boolean;
    evseidpublic: string;
    connectorType: string;
    pricing: string;
}

export interface ChargingStationResponse {
    fetchChargingStationDetail: FetchChargingStationDetail;
}

export interface FetchChargingStationDetail {
    status: string;
    isAvailable: boolean;
    evseidpublic: string;
    connectors: Connector[];
}

export interface Connector {
    type: string;
    power: number;
    pricing: Pricing[];
}

export interface Pricing {
    price: number;
}
</script>

<style></style>