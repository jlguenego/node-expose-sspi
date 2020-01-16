{
  "targets": [
    {
      "target_name": "sspi",
      "sources": [ "cpp/main.cc" ],
      "link_settings": {
        "libraries" : [
          "Secur32.lib",
          "Ws2_32.lib",
        ]
    }
    }
  ]
}
