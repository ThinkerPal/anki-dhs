const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "sg.dhs.computing.2022.ankirevisionapp",
        productName: "Anki Revision App",
        mac: {
          category: "public.app-category.education",
          hardenedRuntime: true,
          entitlements: "build/entitlements.mac.plist",
          entitlementsInherit: "build/entitlements.mac.plist",
          gatekeeperAssess: false,
          darkModeSupport: true,
          type: "development",
          identity: process.env.CODESIGN_ANKI,
          // provisioningProfile: "/Users/thinkerpal/tkrobot.appledist.p12"
        },
        dmg: {
          sign: false,
        },
        win: {
          target: "portable",
        },
        files: ["**/*"],
        extraFiles: [
          {
            from: "backend/ankibackend*",
            to: "backend/ankibackend*",
            filter: "**/*",
          },
          {
            from: "backend/db",
            to: "backend/db",
            filter: "**/*",
          },
        ],
      },
    },
  },
});
