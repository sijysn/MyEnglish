import React, { useEffect, useRef } from "react";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import ActionButton from "../ActionButton";

const QuizOptionButtons = React.forwardRef(
  ({ options, judge, answerQuestion }, ref) => {
    const option1 = useRef(null);
    const option2 = useRef(null);
    const option3 = useRef(null);

    useEffect(() => {
      if (!ref || !option1 || !option2 || !option3) return;

      ref.current = { option1, option2, option3 };
    }, [ref, option1, option2, option3]);

    return (
      <Box display="flex" flexDirection="row" justifyContent="center">
        {options &&
          options.map((option, index) => (
            <Box
              key={option.id}
              display="flex"
              flexDirection="column"
              textAlign="center"
              margin="0 2rem"
              width="30%"
            >
              <ActionButton
                name={option.meaning}
                TypographyVariant="h4"
                color="primary"
                disabled={judge ? true : false}
                ref={index === 0 ? option1 : index === 1 ? option2 : option3}
                onClick={answerQuestion}
                style={{
                  padding: "1rem 2rem",
                }}
              />

              <Typography
                component="span"
                variant="h5"
                color={judge ? "textSecondary" : "primary"}
              >
                {index === 0 ? "←" : index === 1 ? "↑" : "→"}
              </Typography>
            </Box>
          ))}
      </Box>
    );
  }
);

export default QuizOptionButtons;
