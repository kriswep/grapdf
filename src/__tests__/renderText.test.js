import 'isomorphic-fetch';

test('generate dynamic pdf', async () => {
  const res = await fetch('http://localhost:8888/.netlify/functions/grapdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query:
        '{ document(doc: [{ text: {text: "BIG", size: BIG} } { text: {text: "normal"} } { text: {text: "small", size: SMALL} }]) { blob } }',
    }),
  });
  const { data } = await res.json();
  const pdfBlob = data.document.blob;
  expect(pdfBlob.startsWith('data:application/pdf;base64,')).toBeTruthy();
  expect(1).toBeTruthy();
});
