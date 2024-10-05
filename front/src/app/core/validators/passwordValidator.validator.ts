import { AbstractControl, ValidatorFn } from '@angular/forms';

// Fonction de validation du mot de passe
export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value || '';

    // Conditions de validation
    const hasMinLength = value.length >= 8;
    const hasNumber = /[0-9]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    // Si toutes les conditions sont remplies, renvoyer null (pas d'erreur)
    const isValid = hasMinLength && hasNumber && hasLowerCase && hasUpperCase && hasSpecialCharacter;

    // Renvoie un objet d'erreur si non valide, sinon null
    return !isValid ? {
      passwordStrength: {
        hasMinLength,
        hasNumber,
        hasLowerCase,
        hasUpperCase,
        hasSpecialCharacter
      }
    } : null;
  };
}
