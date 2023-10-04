import React from "react";
import { Switch, VStack } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { darkThemeOn, darkThemeOff } from "../reducers/app";
const ThemeSwitch = () => {
  // const count = useSelector((state) => state.app.darkTheme)
  const dispatch = useDispatch();
  const onSwitchChange = (evt) => {};

  return (
    <VStack>
      <p>Dark theme</p>
      <Switch
        colorScheme="teal"
        size="lg"
        onChange={(e) =>
          e.target.checked ? dispatch(darkThemeOn()) : dispatch(darkThemeOff())
        }
      />
    </VStack>
  );
};

export default ThemeSwitch;
