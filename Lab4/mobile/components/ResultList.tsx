import { FlashList } from "@shopify/flash-list";
import { ResultListElement } from "./ResultListElement";

type ResultListProps = {
  resultData: Record<string, number>;
};

export const ResultList = (props: ResultListProps) => {
  const { resultData } = props;
  const resultEntries = Object.entries(resultData);

  return (
    <FlashList
      data={resultEntries}
      renderItem={({ item: [fungusName, confidence] }) =>
        <ResultListElement fungusName={fungusName} confidence={confidence} />
      }
      estimatedItemSize={10}
      style={{ flex: 1 }}
    />
  );
};
