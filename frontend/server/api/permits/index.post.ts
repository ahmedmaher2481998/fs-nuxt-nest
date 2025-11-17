export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const backendUrl = config.public.backendApiUrl;

  try {
    const body = await readBody(event);

    const response = await fetch(`${backendUrl}/permits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw createError({
        statusCode: response.status,
        statusMessage: errorData.message || 'Failed to create permit application',
      });
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating permit:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to create permit application',
    });
  }
});
