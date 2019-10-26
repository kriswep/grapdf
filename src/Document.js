import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});
const textStyleFactory = (props = {}) =>
  StyleSheet.create({
    text: {
      fontSize:
        props.size === 'SMALL' ? '8pt' : props.size === 'BIG' ? '64pt' : '16pt',
    },
  });

// Create Document Component
const MyDocument = props => {
  const { docs } = props;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {docs.map((doc, key) => {
          const textStyles = textStyleFactory({ size: doc.size });
          return (
            <View style={styles.section} key={key}>
              <Text style={textStyles.text}>{doc.text}</Text>
            </View>
          );
        })}
      </Page>
    </Document>
  );
};

export default MyDocument;
