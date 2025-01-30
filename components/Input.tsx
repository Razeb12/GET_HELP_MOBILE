import {
  View,
  Text,
  TextInput,
  type TextInputProps,
  TouchableOpacity,
  type NativeSyntheticEvent,
  type TextInputFocusEventData,
} from "react-native";
import React, { useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";

interface Props extends TextInputProps {
  label: string;
  type?: "text" | "number" | "password";
  sensitive?: boolean;
  error?: string;
  showTooltip?: boolean;
  tooltipText?: string;
  disabled?: boolean;
}

const Input = ({
  label,
  type = "text",
  sensitive = false,
  error,
  onBlur,
  showTooltip = false,
  tooltipText = "",
  disabled = false,
  ...props
}: Props) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const keyboardType = type === "number" ? "numeric" : "default";
  const isPasswordInput = type === "password";

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
      setIsTouched(true);
      if (onBlur) {
        onBlur(e);
      }
    },
    [onBlur]
  );

  const showError = !isFocused && isTouched && error;

  return (
    <View className="mb-2">
      <View className="py-1 bg-white">
        <View className="flex flex-row items-center space-x-4">
          <Text
            style={{ fontFamily: "noto-sans-medium" }}
            className="text-[#000000] text-[14px]"
          >
            {label}
          </Text>
        </View>
      </View>

      <View className="relative">
        <TextInput
          className={`h-[52px] border rounded-lg px-3 w-full ${
            disabled ? "bg-gray-100 text-gray-500" : ""
          } ${
            showError
              ? "border-red-500"
              : isFocused
              ? "border-blue-500"
              : "border-gray-400"
          }`}
          keyboardType={keyboardType}
          secureTextEntry={isPasswordInput && !isPasswordVisible}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor="gray"
          editable={!disabled}
          selectTextOnFocus={!disabled}
          {...props}
        />

        {isPasswordInput && sensitive && !disabled && (
          <TouchableOpacity
            onPress={() => setPasswordVisible(!isPasswordVisible)}
            className="absolute right-3 top-4"
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        )}
      </View>

      {showError && (
        <Text
          style={{ fontFamily: "noto-sans" }}
          className="text-red-500 text-xs mt-1"
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export default Input;
