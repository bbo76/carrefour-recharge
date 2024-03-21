<template>
    <div class="flex items-center justify-center h-screen">
        <div class="w-2/5 border-2 border-blue-400 rounded-lg p-10">
            <h1 class="text-center">Authentification</h1>
            <UDivider class="p-1" />
            <div class="space-y-4">
                <UFormGroup label="Email" name="email">
                    <UInput v-model="email" />
                </UFormGroup>

                <UFormGroup label="Mot de passe" name="password">
                    <UInput v-model="password" type="password" />
                </UFormGroup>
                <div class="flex justify-center">
                    <UButton :loading="pending" class="flex justify-center px-5" @click="onSubmit">Se connecter
                    </UButton>
                </div>
            </div>


        </div>
    </div>
</template>

<script lang="ts" setup>
const email = ref('')
const password = ref('')
const body = computed(() => ({
    email: email.value,
    password: password.value
}))
const pending = ref(false)
async function onSubmit() {
    pending.value = true
    var token = await $fetch<CarrefourAuthResponse>('/carrefour/auth', {
        method: 'POST',
        body: body.value
    })

    if (token?.access_token) {
        const bearer = useCookie<string>('apollo:default.token', { maxAge: 3000 })//50 minutes
        bearer.value = token.access_token
        navigateTo('/')
    } else {
        pending.value = false
    }
}


class CarrefourAuthResponse {
    access_token: string;

    constructor(access_token: string) {
        this.access_token = access_token
    }
}
</script>

<style></style>