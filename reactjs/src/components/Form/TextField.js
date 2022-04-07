import React from "react";
import FormField from "./FormField";
import { TextField as MUITextField } from "@mui/material";

const TextField = React.forwardRef((props, ref) => (
  <FormField ref={ref} Component={MUITextField} {...props} />
));

export default TextField;
