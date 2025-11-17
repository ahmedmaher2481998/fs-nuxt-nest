export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const backendUrl = config.public.backendApiUrl;
  const id = getRouterParam(event, 'id');

  try {
    const response = await fetch(`${backendUrl}/permits/${id}`);

    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: 'Permit application not found',
      });
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching permit:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch permit application',
    });
  }
});
