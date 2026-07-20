const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const { verify } = require("otplib");
const { generateURI } = require("otplib");

const totpSecret = defineSecret("TOTP_SECRET");

exports.verifyTotp = onCall({ secrets: [totpSecret] }, async (request) => {
  if (!request.auth) {
    throw new HttpsError(
      "unauthenticated",
      "Connecte-toi d'abord avec ton email et mot de passe.",
    );
  }

  const { code } = request.data;
  if (!code || typeof code !== "string") {
    throw new HttpsError("invalid-argument", "Code manquant.");
  }

  const secret = totpSecret.value();
  const result = await verify({ secret, token: code });

  return { valid: result.valid };
});

exports.getTotpUri = onCall({ secrets: [totpSecret] }, async (request) => {
  if (!request.auth) {
    throw new HttpsError(
      "unauthenticated",
      "Connecte-toi d'abord pour accéder à cette page.",
    );
  }

  const secret = totpSecret.value();
  const uri = generateURI({
    secret,
    label: "AAC Admin",
    issuer: "AAC Djibouti",
  });

  return { uri, secret };
});
