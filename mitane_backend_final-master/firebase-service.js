const admin = require('firebase-admin')
const serviceAccount = {
  "type": "service_account",
  "project_id": "mitane-6c224",
  "private_key_id": "a0ec8fa6b2c8cfc72e1f9598a21b7c2a48b01372",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCstPIbAro6YO0e\nrO2beRnzwPe+zIUuII/AV4dM3nfAyyZy5tjMZn54VnPpORsiQDBhy8B+tVlVu9Xa\nFEZ2YJmLM+DnKEgeZA+AsRESq7xGXSiGCk+GRCeBgpeGzAbQB8AFrkWDpVwtNPt9\nPBRowT2UBVdEJQF01v6iMRfxbFGl6f/CVGhoPA5xC0aSICIxwlIbHG1EcXN2wrTr\nhXGN2xyW12o6dh6NqSiXb9ckRbiSoGUplq0NMbWTscbHYsY2Ccmxh6wzfJGQdDBy\no5hj9A9ZmrndKvjSrWPge8SX4BpqPE4ZMfMMMVNlIHl5Wwdae2S9XICA3+bx9IW5\n86ruw5c9AgMBAAECggEAIQkbpn8HEFOqB8wcRzkK9c1blmuYrhIcbTZQ8ys6zO4P\nFLuDjNWuK2aeFWaPAiY1Gv/WemZGCFg9t9FZCRvBQxdRVeYmpWmObZdxJJklEnCP\nZ9RhEdXHmMZaJbaxNunEmVGUinH/B8aytGnhnYgZN08uOiK5/JeDbZLmeY+2rn2b\ns8fNZEmi/N2mlEZnnFaP0NmT4jMRuiv7SeMDc3Wz9YSfQCyQa9bpCh4Sl4y1KBTX\nkgIX7FaDhkG9qogAcFwjTAV2jyIqZUb2nAF34WqLPs3XrqojYbr10BoOyGIGrRwv\nOZTTJvQH2/2to8QmWDkK2StFxwG4R0LOUH36NtyIAQKBgQDU7BxfuQC3zW1KSPbb\ng/ECwXavg1dv7w5uGkd0JlfLY8uvcNb5zFCLk9XZNvNdDFPyNQLnJbwg5hid/5jY\nMtYUi7UAg6QpGET/S2CAQSq2JVjTxsd2rJu5Q/JASLEBh3gNdbbt/55DvsxPoQ6R\nNU7gMCr7kXMFA7it46BoWsY0QQKBgQDPpfQMW8US3xISI1Iz1eFmEhApVnFWFoky\n7gekZi60IrJuuQseYCeqjYDmc0yLIXV2PwotL4mDwO6FfK+63tcqcZxhGLa5BaJz\nlYjv41mCLq4+YNkXt1aeIgM/+JTlR1gDa7BYSlhFuX5HjHVslJq6vruWiFl0x52W\nbAwjmjkz/QKBgHBUjHeXs6BEeWcabVnMFwd8J3BbG3MLLJK7vHyzidfcs2XAYznw\nJ4IroUNycRvi2BrNCtYFm2XD3rLkWK+eykCWoAxAZwfjLOt+yc+AEdd8hotbsHmU\ngKdSCGkPsIp8/MIlGzgehlF5RHKyJmxHMnCmGNcVmhfIKdNbZpIHac/BAoGAPeA8\n5gXepu30C5Wc5DdisDDHwhmxMi8K+TM28cVFO4ZvV1EqwAV1LHx4IbPP5lG1F+RX\nGvnkZ29xZDOwheXrhglOyRw9LstACmNP5/P+cy2H3KytZETMudh20XQ4ok3tKy/G\n37hfr39D4vw27YEmzmkRqxy8U3E8Q1u1DlLhot0CgYEAxNTGip8Hm24XROps2ajm\nOweP4JFfgjh6qNRql3Hk+mGM2gxMvLfx8n0Jd5qqkJ/xHjY9tI8DZXCQ9nmBRAOh\n0dS23esxc/bmqrJSypL/04DAvPcDXX9wpPy4gbRZDY0hBHyqkDPW9iHf5yNDMB1t\nYWZvCjBlNLIXk2ZO6sLQQ0E=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-mpf6r@mitane-6c224.iam.gserviceaccount.com",
  "client_id": "115824975745870592344",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-mpf6r%40mitane-6c224.iam.gserviceaccount.com"
}


exports.admin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "mitane-6c224.appspot.com"
});
