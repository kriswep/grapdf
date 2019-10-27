import 'isomorphic-fetch';

test('generate basic pdf', async () => {
  const res = await fetch('http://localhost:4000', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: '{ document{ blob } }' }),
  });
  const { data } = await res.json();
  const pdfBlob = data.document.blob;
  expect(pdfBlob.startsWith('data:application/pdf;base64,')).toBeTruthy();
});
