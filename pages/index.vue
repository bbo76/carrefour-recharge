<template>
    <div>
        <h1>Home</h1>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    middleware: 'auth'
})
const { clients, getToken, onLogin, onLogout } = useApollo()
var zizi = await getToken()
console.log(zizi)
const query = gql`
query zozo {
 getChargingStationList{
 city
 postalCode
 evseid
#  details{
#     connectors{
#         type
#     }
#  }
 cpo
 locationid
 postalCode
 }
 }`
const { data } = await useAsyncQuery(query)
console.log(data)
</script>

<style></style>