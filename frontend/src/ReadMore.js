import { useState, useRef, useEffect } from "react";

function ReadMore({ text, maxLines = 5 }) {
  const [expanded, setExpanded] = useState(false);
  const [truncated, setTruncated] = useState(false);
  const textRef = useRef();

  useEffect(() => {
    // Check if the content overflows the container
    if (textRef.current) {
      const el = textRef.current;
      setTruncated(el.scrollHeight > el.clientHeight);
    }
  }, [text]);

  return (
    <div>
      <p
        ref={textRef}
        style={{
          display: "-webkit-box",
          WebkitLineClamp: expanded ? "none" : maxLines,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {text}
      </p>

      {truncated && (
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show Less" : "Read More"}
        </span>
      )}
    </div>
  );
}

export default ReadMore;


