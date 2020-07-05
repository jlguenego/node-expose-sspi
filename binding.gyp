{
  "targets": [
    {
      "target_name": "api",
      "sources": [
        "cpp/**/*.cc",
      ],

      # Macros to define for using WCHAR on Windows.
      "defines": ["_UNICODE", "UNICODE"],

      # All DLL for linking. The .lib files are indicated here.
      "link_settings": {
        "libraries": [
          "Secur32.lib",
          "Ws2_32.lib",
          "ActiveDS.lib",
          "ADSIid.lib",
          "comsuppw.lib",
          "netapi32.lib",
        ]
      },
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],

      # Exclamation mark is for removing settings.
      # Here we want to add exception handling.
      "cflags!": [
        "-fno-exceptions"
      ],
      "cflags_cc!": [
        "-fno-exceptions"
      ],
      
      "xcode_settings": {
        "GCC_ENABLE_CPP_EXCEPTIONS": "YES",
        "CLANG_CXX_LIBRARY": "libc++",
        "MACOSX_DEPLOYMENT_TARGET": "10.7"
      },
      "msvs_settings": {
        "VCCLCompilerTool": {
          "ExceptionHandling": 1
        }
      }
    }
  ]
}
