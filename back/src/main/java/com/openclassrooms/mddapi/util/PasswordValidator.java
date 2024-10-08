package com.openclassrooms.mddapi.util;

import java.util.regex.Pattern;

public class PasswordValidator {
    private static final int MIN_LENGTH = 8;
    private static final Pattern HAS_NUMBER = Pattern.compile(".*\\d.*");
    private static final Pattern HAS_LOWERCASE = Pattern.compile(".*[a-z].*");
    private static final Pattern HAS_UPPERCASE = Pattern.compile(".*[A-Z].*");
    private static final Pattern HAS_SPECIAL_CHAR = Pattern.compile(".*[!@#$%^&*(),.?\":{}|<>].*");

    public static boolean isValid(String password) {
        return password != null &&
                password.length() >= MIN_LENGTH &&
                HAS_NUMBER.matcher(password).matches() &&
                HAS_LOWERCASE.matcher(password).matches() &&
                HAS_UPPERCASE.matcher(password).matches() &&
                HAS_SPECIAL_CHAR.matcher(password).matches();
    }
}