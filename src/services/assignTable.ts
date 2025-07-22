export const enableTableService = async (id: string, body = {}) => {
  const res = await fetch(`https://internal.api.tomatesoft.com/tables/enable/host/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error al habilitar la mesa');
  }

  return res.json();
};
