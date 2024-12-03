/*
Copyright 2012 Eiji Kitamura

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Author: Eiji Kitamura (agektmr@gmail.com)
*/
chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    id: 'main',
    width: 960,
    minWidth: 770,
    height: 600,
    minHeight: 400,
    frame: 'none'
  }, function(win) {
    win.contentWindow.MusicLoader = MusicLoader;
    win.contentWindow.InfoManager = InfoManager;
    win.contentWindow.QuotaManager = QuotaManager;
  });
});