(function() {
  const button = document.getElementById('sendQuery');

  button.addEventListener(
    'click',
    async e => {
      const textarea = document.getElementById('query');
      const pdfBlob = await fetch('http://localhost:4000', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: textarea.value }),
      })
        .then(res => res.json())
        .then(({ data, errors }) => {
          if (errors) {
            throw new Error(
              errors.reduce(
                (messages, currentError) =>
                  messages
                    ? `${messages};
${currentError.message}`
                    : currentError.message,
                '',
              ),
            );
          }

          return data.document.blob;
        })
        .catch(err => {
          alert(`Error fetching: ${err.message}`);
        });
      if (!pdfBlob) return;
      const link = document.createElement('a');
      link.href = pdfBlob;
      link.download = 'file.pdf';
      link.click();
    },
    false,
  );
})();
