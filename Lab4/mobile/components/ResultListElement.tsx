import { ThemedText } from "./ThemedText";

type ResultListElementProps = {
  fungusName: string,
  confidence: number
}

export const ResultListElement = (props: ResultListElementProps) => {
  const { fungusName, confidence } = props;

  return (
    <ThemedText type='black'>{fungusName} : {confidence}</ThemedText>
  )
}
