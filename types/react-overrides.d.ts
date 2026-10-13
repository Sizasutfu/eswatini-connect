// Silences the "Props must be serializable" false positive that
// certain @types/react versions emit for callback props in
// "use client" files. This warning is a known bug and does not
// reflect a real serialization issue.
export {};