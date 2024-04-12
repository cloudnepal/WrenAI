import dynamic from 'next/dynamic';
import { Button, Typography } from 'antd';
import CopyOutlined from '@ant-design/icons/lib/icons/CopyOutlined';
import UpCircleOutlined from '@ant-design/icons/UpCircleOutlined';
import PreviewData from '@/components/dataPreview/PreviewData';
import { PreviewDataMutationResult } from '@/apollo/client/graphql/home.generated';

const CodeBlock = dynamic(() => import('@/components/editor/CodeBlock'), {
  ssr: false,
});

const { Text } = Typography;

export interface Props {
  isViewSQL?: boolean;
  isViewFullSQL?: boolean;
  isPreviewData?: boolean;
  onCloseCollapse: () => void;
  onCopyFullSQL?: () => void;
  sql: string;
  previewDataResult: PreviewDataMutationResult;
}

export default function CollapseContent(props: Props) {
  const {
    isViewSQL,
    isViewFullSQL,
    isPreviewData,
    onCloseCollapse,
    onCopyFullSQL,
    sql,
    previewDataResult,
  } = props;

  return (
    <>
      {(isViewSQL || isViewFullSQL) && (
        <pre className="p-0 my-3">
          <CodeBlock code={sql} showLineNumbers maxHeight="300" />
        </pre>
      )}
      {isPreviewData && (
        <div className="my-3">
          <PreviewData {...previewDataResult} />
        </div>
      )}
      {(isViewSQL || isPreviewData) && (
        <div className="d-flex justify-space-between">
          <Button
            className="gray-6"
            type="text"
            size="small"
            icon={<UpCircleOutlined />}
            onClick={onCloseCollapse}
          >
            Collapse
          </Button>
          {isPreviewData && (
            <Text className="text-base gray-6">Showing up to 500 rows</Text>
          )}
        </div>
      )}
      {isViewFullSQL && (
        <>
          <Button
            className="gray-6 mr-2"
            type="text"
            size="small"
            icon={<UpCircleOutlined />}
            onClick={onCloseCollapse}
          >
            Collapse
          </Button>
          <Button
            className="gray-6"
            type="text"
            size="small"
            icon={<CopyOutlined />}
            onClick={onCopyFullSQL}
          >
            Copy
          </Button>
        </>
      )}
    </>
  );
}