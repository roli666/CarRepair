import { randomBytes } from "crypto";

interface RandomImageProps {
  topic?: string;
  width?: number;
  height?: number;
}
function RandomImage(props: RandomImageProps) {
  const random = randomBytes(5);
  const { width = props.width ?? 320, height = props.height ?? 240 } = props;

  return props.topic ? (
    <img className="responsive-img" alt="" src={`http://loremflickr.com/${width}/${height}/${props.topic}?random=${random}`} />
  ) : (
    <img className="responsive-img" alt="" src={`http://loremflickr.com/${width}/${height}?random=${random}`} />
  );
}

export default RandomImage;
