import 'isomorphic-fetch';

test('generate basic pdf', async () => {
  const pdfBlob = await fetch('http://localhost:4000', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: '{ document{ blob } }' }),
  })
    .then(res => res.json())
    .then(({ data }) => data.document.blob)
    .catch(e => expect(e).toBeUndefined());
  expect(pdfBlob.startsWith('data:application/pdf;base64,')).toBeTruthy();
});
