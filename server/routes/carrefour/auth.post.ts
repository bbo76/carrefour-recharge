export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  var token = await $fetch('https://api.recharge.carrefour.fr/auth/login', {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return token
})
