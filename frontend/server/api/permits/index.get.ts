export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const backendUrl = config.public.backendApiUrl;

  try {
    const response = await fetch(`${backendUrl}/permits`);

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching permits:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch permit applications',
    });
  }
});
