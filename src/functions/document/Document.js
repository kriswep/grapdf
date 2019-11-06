import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#E4E4E4',
  },
  titleSection: {
    margin: 10,
    padding: 10,
    flexBasis: '100%',
  },
  textSection: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});
const titleStyleFactory = (props = {}) =>
  StyleSheet.create({
    text: {
      fontSize:
        props.size === 'SMALL'
          ? '16pt'
          : props.size === 'BIG'
          ? '32pt'
          : '24pt',
      fontWeight: 'bold',
    },
  });
const textStyleFactory = (props = {}) =>
  StyleSheet.create({
    text: {
      fontSize:
        props.size === 'SMALL' ? '8pt' : props.size === 'BIG' ? '24pt' : '16pt',
    },
  });

// Create Document Component
const MyDocument = props => {
  const { docs = [] } = props;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {docs.map((primitive, key) => {
          if (primitive.title) {
            const titleStyles = titleStyleFactory({
              size: primitive.title.size,
            });
            return (
              <View style={styles.titleSection} key={key}>
                <Text style={titleStyles.text}>{primitive.title.text}</Text>
              </View>
            );
          } else if (primitive.text) {
            const textStyles = textStyleFactory({ size: primitive.text.size });
            return (
              <View style={styles.textSection} key={key}>
                <Text style={textStyles.text}>{primitive.text.text}</Text>
              </View>
            );
          } else {
            return null;
          }
        })}
      </Page>
    </Document>
  );
};

export default MyDocument;
