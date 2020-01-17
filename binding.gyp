{
  "targets": [
    {
      "target_name": "sspi",
      "sources": [
        "cpp/*.cc"
      ],
      "defines": ["_UNICODE", "UNICODE"],
      "link_settings": {
        "libraries": [
          "Secur32.lib",
          "Ws2_32.lib"
        ]
      },
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
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
