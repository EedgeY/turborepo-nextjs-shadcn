'use client';
import React, { useState, useRef, CSSProperties } from 'react';
import { DndProvider, useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Font,
} from '@react-pdf/renderer';

// フォントの登録
Font.register({
  family: 'NotoSansJP',
  fonts: [
    { src: '../fonts/NotoSansJP-Regular.ttf' },
    { src: '../fonts/NotoSansJP-Bold.ttf', fontWeight: 'bold' },
  ],
});

const fontFamily = 'NotoSansJP';

// スタイルの定義
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
    fontFamily: fontFamily,
  },
  title: {
    fontSize: 24,
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: fontFamily,
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
    fontFamily: fontFamily,
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    fontFamily: fontFamily,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '33.33%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

// HTMLスタイルの定義
const htmlStyles: { [key: string]: CSSProperties } = {
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
    fontFamily: fontFamily,
    minHeight: '100vh',
  },
  title: {
    fontSize: 24,
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: fontFamily,
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
    fontFamily: fontFamily,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: fontFamily,
  },
  tableCell: {
    border: '1px solid black',
    padding: 5,
    fontSize: 10,
  },
};

// 型定義
interface ComponentItem {
  id: number;
  type: 'text' | 'title' | 'table';
  content: string | TableData;
}

interface TableData {
  headers: string[];
  rows: string[][];
}

interface DraggableComponentProps extends ComponentItem {
  index: number;
  moveComponent: (dragIndex: number, hoverIndex: number) => void;
  updateComponent: (id: number, content: string | TableData) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

// ドラッグ可能なコンポーネント
const DraggableComponent: React.FC<DraggableComponentProps> = ({
  id,
  type,
  content,
  index,
  moveComponent,
  updateComponent,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drag] = useDrag({
    type: 'component',
    item: { id, type, index },
  });

  const [, drop] = useDrop({
    accept: 'component',
    hover(item: unknown, monitor: DropTargetMonitor) {
      const dragItem = item as DragItem;
      if (!ref.current) {
        return;
      }
      const dragIndex = dragItem.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveComponent(dragIndex, hoverIndex);
      dragItem.index = hoverIndex;
    },
  });

  drag(drop(ref));

  const handleContentChange = (newContent: string | TableData) => {
    updateComponent(id, newContent);
  };

  const renderEditableContent = () => {
    switch (type) {
      case 'text':
        return (
          <textarea
            style={htmlStyles.text}
            value={content as string}
            onChange={(e) => handleContentChange(e.target.value)}
          />
        );
      case 'title':
        return (
          <input
            type='text'
            style={htmlStyles.title}
            value={content as string}
            onChange={(e) => handleContentChange(e.target.value)}
          />
        );
      case 'table':
        const tableData = content as TableData;
        return (
          <table style={htmlStyles.table}>
            <thead>
              <tr>
                {tableData.headers.map((header, index) => (
                  <th key={index} style={htmlStyles.tableCell}>
                    <input
                      type='text'
                      value={header}
                      onChange={(e) => {
                        const newHeaders = [...tableData.headers];
                        newHeaders[index] = e.target.value;
                        handleContentChange({
                          ...tableData,
                          headers: newHeaders,
                        });
                      }}
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} style={htmlStyles.tableCell}>
                      <input
                        type='text'
                        value={cell}
                        onChange={(e) => {
                          const newRows = [...tableData.rows];
                          newRows[rowIndex][cellIndex] = e.target.value;
                          handleContentChange({ ...tableData, rows: newRows });
                        }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={ref}
      style={{ margin: '10px', padding: '10px', border: '1px dashed #000' }}
    >
      {renderEditableContent()}
    </div>
  );
};

// PDFコンポーネント
const PDFComponent: React.FC<ComponentItem> = ({ type, content }) => {
  switch (type) {
    case 'text':
      return <Text style={styles.text}>{content as string}</Text>;
    case 'title':
      return <Text style={styles.title}>{content as string}</Text>;
    case 'table':
      const tableData = content as TableData;
      return (
        <View style={styles.table}>
          <View style={styles.tableRow}>
            {tableData.headers.map((header, index) => (
              <View key={index} style={styles.tableCol}>
                <Text style={styles.tableCell}>{header}</Text>
              </View>
            ))}
          </View>
          {tableData.rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.tableRow}>
              {row.map((cell, cellIndex) => (
                <View key={cellIndex} style={styles.tableCol}>
                  <Text style={styles.tableCell}>{cell}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      );
    default:
      return null;
  }
};

// メインアプリケーション
const PDFReportBuilder: React.FC = () => {
  const [components, setComponents] = useState<ComponentItem[]>([]);

  const addComponent = (type: 'text' | 'title' | 'table') => {
    let newComponent: ComponentItem;
    if (type === 'table') {
      newComponent = {
        id: Date.now(),
        type,
        content: {
          headers: ['Column 1', 'Column 2', 'Column 3'],
          rows: [
            ['Row 1, Cell 1', 'Row 1, Cell 2', 'Row 1, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
          ],
        },
      };
    } else {
      newComponent = { id: Date.now(), type, content: `New ${type}` };
    }
    setComponents([...components, newComponent]);
  };

  const moveComponent = (dragIndex: number, hoverIndex: number) => {
    const dragComponent = components[dragIndex];
    setComponents(
      components.reduce<ComponentItem[]>((acc, component, idx) => {
        if (idx === dragIndex) return acc;
        if (idx === hoverIndex) {
          return [
            ...acc,
            dragIndex < hoverIndex ? component : dragComponent,
            dragIndex < hoverIndex ? dragComponent : component,
          ];
        }
        return [...acc, component];
      }, [])
    );
  };

  const updateComponent = (id: number, content: string | TableData) => {
    setComponents(
      components.map((component) =>
        component.id === id ? { ...component, content } : component
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', height: '100vh' }}>
        <div
          style={{
            width: '200px',
            padding: '20px',
            borderRight: '1px solid #ccc',
          }}
        >
          <button onClick={() => addComponent('text')}>Add Text</button>
          <button onClick={() => addComponent('title')}>Add Title</button>
          <button onClick={() => addComponent('table')}>Add Table</button>
        </div>
        <div
          style={{
            flex: 1,
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              flex: 1,
              marginBottom: '20px',
              border: '1px solid #ccc',
              padding: '10px',
              overflowY: 'auto',
            }}
          >
            {components.map((component, index) => (
              <DraggableComponent
                key={component.id}
                index={index}
                moveComponent={moveComponent}
                updateComponent={updateComponent}
                {...component}
              />
            ))}
          </div>
          <div style={{ height: '50%' }}>
            <PDFViewer width='100%' height='100%'>
              <Document>
                <Page size='A4' style={styles.page}>
                  {components.map((component) => (
                    <PDFComponent key={component.id} {...component} />
                  ))}
                  <Text
                    style={styles.pageNumber}
                    render={({ pageNumber, totalPages }) =>
                      `${pageNumber} / ${totalPages}`
                    }
                    fixed
                  />
                </Page>
              </Document>
            </PDFViewer>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default PDFReportBuilder;
