(function(){
    var script = {
 "scrollBarMargin": 2,
 "data": {
  "name": "Player468"
 },
 "id": "rootPlayer",
 "children": [
  "this.MainViewer",
  "this.Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
  "this.Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4",
  "this.Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
  "this.Container_062AB830_1140_E215_41AF_6C9D65345420",
  "this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
  "this.Container_71D0AAF4_7E3A_07B8_41DD_02FFDFA1C984"
 ],
 "layout": "absolute",
 "class": "Player",
 "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.Button_485BFF41_598E_3DB2_41A9_33F36E014467], 'gyroscopeAvailable'); this.syncPlaylists([this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A].forEach(function(component) { component.set('visible', false); }) }",
 "paddingRight": 0,
 "width": "100%",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "scripts": {
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "unregisterKey": function(key){  delete window[key]; },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "getKey": function(key){  return window[key]; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "existsKey": function(key){  return key in window; },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "registerKey": function(key, value){  window[key] = value; }
 },
 "minHeight": 20,
 "downloadEnabled": false,
 "defaultVRPointer": "laser",
 "verticalAlign": "top",
 "buttonToggleFullscreen": "this.Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A",
 "height": "100%",
 "minWidth": 20,
 "contentOpaque": false,
 "borderRadius": 0,
 "buttonToggleMute": "this.Button_4C5C0864_5A8E_C472_41C4_7C0748488A41",
 "borderSize": 0,
 "definitions": [{
 "vfov": 180,
 "label": "17",
 "id": "panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_650CF988_7CB4_6355_41DD_E458C5DF1270_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_650C5189_7CB4_6357_41D5_F6EBB5255754",
   "class": "AdjacentPanorama"
  }
 ],
 "label": "7",
 "id": "panorama_66512894_7CB4_217D_41A4_141C847B7AB5",
 "class": "Panorama",
 "overlays": [
  "this.overlay_667A7155_7C8C_23FF_41B5_298FFE768382"
 ],
 "vfov": 180,
 "pitch": 0,
 "partial": false,
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_66512894_7CB4_217D_41A4_141C847B7AB5_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_66512894_7CB4_217D_41A4_141C847B7AB5_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_66512894_7CB4_217D_41A4_141C847B7AB5_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_66512894_7CB4_217D_41A4_141C847B7AB5_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_66512894_7CB4_217D_41A4_141C847B7AB5_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_66512894_7CB4_217D_41A4_141C847B7AB5_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_66512894_7CB4_217D_41A4_141C847B7AB5_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_66512894_7CB4_217D_41A4_141C847B7AB5_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_66512894_7CB4_217D_41A4_141C847B7AB5_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_66512894_7CB4_217D_41A4_141C847B7AB5_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_66512894_7CB4_217D_41A4_141C847B7AB5_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_66512894_7CB4_217D_41A4_141C847B7AB5_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_66512894_7CB4_217D_41A4_141C847B7AB5_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_66512894_7CB4_217D_41A4_141C847B7AB5_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_66512894_7CB4_217D_41A4_141C847B7AB5_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_66512894_7CB4_217D_41A4_141C847B7AB5_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_66512894_7CB4_217D_41A4_141C847B7AB5_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_66512894_7CB4_217D_41A4_141C847B7AB5_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_66512894_7CB4_217D_41A4_141C847B7AB5_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_66512894_7CB4_217D_41A4_141C847B7AB5_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_66512894_7CB4_217D_41A4_141C847B7AB5_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_66512894_7CB4_217D_41A4_141C847B7AB5_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_66512894_7CB4_217D_41A4_141C847B7AB5_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_66512894_7CB4_217D_41A4_141C847B7AB5_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_66512894_7CB4_217D_41A4_141C847B7AB5_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_66512894_7CB4_217D_41A4_141C847B7AB5_t.jpg"
},
{
 "vfov": 180,
 "label": "61",
 "id": "panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "vfov": 180,
 "label": "18",
 "id": "panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "media": "this.panorama_77073E88_7C74_39D8_41D2_EDE228DC3637",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_camera"
  },
  {
   "media": "this.panorama_774327AD_7C74_17D8_41D4_549B7AFED330",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_774327AD_7C74_17D8_41D4_549B7AFED330_camera"
  },
  {
   "media": "this.panorama_77206015_7C75_E8CB_41C6_5A45F81CF834",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_camera"
  },
  {
   "media": "this.panorama_7721C854_7C75_F949_41A2_6F10303B3013",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_7721C854_7C75_F949_41A2_6F10303B3013_camera"
  },
  {
   "media": "this.panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_camera"
  },
  {
   "media": "this.panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_camera"
  },
  {
   "media": "this.panorama_66512894_7CB4_217D_41A4_141C847B7AB5",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_66512894_7CB4_217D_41A4_141C847B7AB5_camera"
  },
  {
   "media": "this.panorama_650C5189_7CB4_6357_41D5_F6EBB5255754",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_camera"
  },
  {
   "media": "this.panorama_650CF988_7CB4_6355_41DD_E458C5DF1270",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650CF988_7CB4_6355_41DD_E458C5DF1270_camera"
  },
  {
   "media": "this.panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6_camera"
  },
  {
   "media": "this.panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808_camera"
  },
  {
   "media": "this.panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB_camera"
  },
  {
   "media": "this.panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61_camera"
  },
  {
   "media": "this.panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64_camera"
  },
  {
   "media": "this.panorama_650D5C06_7CB4_215D_41B2_166656AAE85A",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650D5C06_7CB4_215D_41B2_166656AAE85A_camera"
  },
  {
   "media": "this.panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED_camera"
  },
  {
   "media": "this.panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411_camera"
  },
  {
   "media": "this.panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0_camera"
  },
  {
   "media": "this.panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618_camera"
  },
  {
   "media": "this.panorama_650AB660_7CB4_21D5_41D6_77DF25222E74",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650AB660_7CB4_21D5_41D6_77DF25222E74_camera"
  },
  {
   "media": "this.panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47_camera"
  },
  {
   "media": "this.panorama_65075791_7CB4_2F77_41D5_7169365EF5EE",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65075791_7CB4_2F77_41D5_7169365EF5EE_camera"
  },
  {
   "media": "this.panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE_camera"
  },
  {
   "media": "this.panorama_6500E888_7CB4_6155_41D4_66E56ECD949B",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6500E888_7CB4_6155_41D4_66E56ECD949B_camera"
  },
  {
   "media": "this.panorama_653D30D6_7CB4_62FD_419D_932F3576E628",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_653D30D6_7CB4_62FD_419D_932F3576E628_camera"
  },
  {
   "media": "this.panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101_camera"
  },
  {
   "media": "this.panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1_camera"
  },
  {
   "media": "this.panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684_camera"
  },
  {
   "media": "this.panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA_camera"
  },
  {
   "media": "this.panorama_65004C08_7CB4_2154_41C4_515DD8E22A18",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 30)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65004C08_7CB4_2154_41C4_515DD8E22A18_camera"
  },
  {
   "media": "this.panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 30, 31)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828_camera"
  },
  {
   "media": "this.panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 31, 32)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E_camera"
  },
  {
   "media": "this.panorama_653B059A_7CB7_E375_41C6_BDA0947533D9",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 32, 33)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_653B059A_7CB7_E375_41C6_BDA0947533D9_camera"
  },
  {
   "media": "this.panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 33, 34)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F_camera"
  },
  {
   "media": "this.panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 34, 35)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41_camera"
  },
  {
   "media": "this.panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 35, 36)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6_camera"
  },
  {
   "media": "this.panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 36, 37)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3_camera"
  },
  {
   "media": "this.panorama_650390D8_7CB4_62F5_41C7_173AD5E45840",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 37, 38)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650390D8_7CB4_62F5_41C7_173AD5E45840_camera"
  },
  {
   "media": "this.panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 38, 39)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B_camera"
  },
  {
   "media": "this.panorama_650B4127_7CB4_635B_41D5_3003690AE788",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 39, 40)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650B4127_7CB4_635B_41D5_3003690AE788_camera"
  },
  {
   "media": "this.panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 40, 41)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13_camera"
  },
  {
   "media": "this.panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 41, 42)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3_camera"
  },
  {
   "media": "this.panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 42, 43)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA_camera"
  },
  {
   "media": "this.panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 43, 44)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6_camera"
  },
  {
   "media": "this.panorama_65043B26_7CB4_275C_41C0_208ED06A59AD",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 44, 45)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65043B26_7CB4_275C_41C0_208ED06A59AD_camera"
  },
  {
   "media": "this.panorama_6502135E_7CB4_E7ED_4170_198010C883AE",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 45, 46)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6502135E_7CB4_E7ED_4170_198010C883AE_camera"
  },
  {
   "media": "this.panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 46, 47)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20_camera"
  },
  {
   "media": "this.panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 47, 48)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819_camera"
  },
  {
   "media": "this.panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 48, 49)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49_camera"
  },
  {
   "media": "this.panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 49, 50)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D_camera"
  },
  {
   "media": "this.panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 50, 51)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E_camera"
  },
  {
   "media": "this.panorama_65054695_7CB4_217F_41DB_C800BA36F500",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 51, 52)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65054695_7CB4_217F_41DB_C800BA36F500_camera"
  },
  {
   "media": "this.panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 52, 53)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06_camera"
  },
  {
   "media": "this.panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 53, 54)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B_camera"
  },
  {
   "media": "this.panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 54, 55)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9_camera"
  },
  {
   "media": "this.panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 55, 56)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2_camera"
  },
  {
   "media": "this.panorama_6503B124_7CB4_235D_41D1_00713694601D",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 56, 57)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6503B124_7CB4_235D_41D1_00713694601D_camera"
  },
  {
   "media": "this.panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 57, 58)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A_camera"
  },
  {
   "media": "this.panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 58, 59)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1_camera"
  },
  {
   "media": "this.panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 59, 60)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E_camera"
  },
  {
   "media": "this.panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 60, 61)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC_camera"
  },
  {
   "media": "this.panorama_65078A23_7CB5_E154_41DD_ADF251B16065",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 61, 62)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65078A23_7CB5_E154_41DD_ADF251B16065_camera"
  },
  {
   "media": "this.panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 62, 63)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25_camera"
  },
  {
   "media": "this.panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 63, 64)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75_camera"
  },
  {
   "media": "this.panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 64, 65)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C_camera"
  },
  {
   "media": "this.panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 65, 66)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701_camera"
  },
  {
   "media": "this.panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 66, 67)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_camera"
  },
  {
   "media": "this.panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 67, 68)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D_camera"
  },
  {
   "media": "this.panorama_65097514_7CB4_637D_41D3_8408DEE26B49",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 68, 69)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65097514_7CB4_637D_41D3_8408DEE26B49_camera"
  },
  {
   "media": "this.panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 69, 70)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C_camera"
  },
  {
   "media": "this.panorama_6504F740_7CB4_6FD5_41CC_983387DB1214",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 70, 71)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6504F740_7CB4_6FD5_41CC_983387DB1214_camera"
  },
  {
   "media": "this.panorama_6507121F_7CB4_216B_41D1_E489A32A04B6",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 71, 72)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6507121F_7CB4_216B_41D1_E489A32A04B6_camera"
  },
  {
   "media": "this.panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 72, 73)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776_camera"
  },
  {
   "media": "this.panorama_650CE384_7CB4_275D_41A6_B7B219AE627E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 73, 74)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650CE384_7CB4_275D_41A6_B7B219AE627E_camera"
  },
  {
   "media": "this.panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8",
   "end": "this.trigger('tourEnded')",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 74, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8_camera"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_650D5C06_7CB4_215D_41B2_166656AAE85A_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "mouseControlMode": "drag_acceleration",
 "id": "MainViewerPanoramaPlayer",
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "buttonToggleGyroscope": "this.Button_485BFF41_598E_3DB2_41A9_33F36E014467",
 "gyroscopeVerticalDraggingEnabled": true
},
{
 "vfov": 180,
 "label": "71",
 "id": "panorama_6504F740_7CB4_6FD5_41CC_983387DB1214",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_6504F740_7CB4_6FD5_41CC_983387DB1214_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6504F740_7CB4_6FD5_41CC_983387DB1214_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6504F740_7CB4_6FD5_41CC_983387DB1214_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6504F740_7CB4_6FD5_41CC_983387DB1214_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6504F740_7CB4_6FD5_41CC_983387DB1214_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_6504F740_7CB4_6FD5_41CC_983387DB1214_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6504F740_7CB4_6FD5_41CC_983387DB1214_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6504F740_7CB4_6FD5_41CC_983387DB1214_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6504F740_7CB4_6FD5_41CC_983387DB1214_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6504F740_7CB4_6FD5_41CC_983387DB1214_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6504F740_7CB4_6FD5_41CC_983387DB1214_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6504F740_7CB4_6FD5_41CC_983387DB1214_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6504F740_7CB4_6FD5_41CC_983387DB1214_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6504F740_7CB4_6FD5_41CC_983387DB1214_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6504F740_7CB4_6FD5_41CC_983387DB1214_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6504F740_7CB4_6FD5_41CC_983387DB1214_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6504F740_7CB4_6FD5_41CC_983387DB1214_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_6504F740_7CB4_6FD5_41CC_983387DB1214_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6504F740_7CB4_6FD5_41CC_983387DB1214_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6504F740_7CB4_6FD5_41CC_983387DB1214_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6504F740_7CB4_6FD5_41CC_983387DB1214_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6504F740_7CB4_6FD5_41CC_983387DB1214_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6504F740_7CB4_6FD5_41CC_983387DB1214_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6504F740_7CB4_6FD5_41CC_983387DB1214_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6504F740_7CB4_6FD5_41CC_983387DB1214_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_6504F740_7CB4_6FD5_41CC_983387DB1214_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "vfov": 180,
 "label": "19",
 "id": "panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_653B059A_7CB7_E375_41C6_BDA0947533D9_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "23",
 "id": "panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "46",
 "id": "panorama_6502135E_7CB4_E7ED_4170_198010C883AE",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_6502135E_7CB4_E7ED_4170_198010C883AE_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6502135E_7CB4_E7ED_4170_198010C883AE_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6502135E_7CB4_E7ED_4170_198010C883AE_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6502135E_7CB4_E7ED_4170_198010C883AE_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6502135E_7CB4_E7ED_4170_198010C883AE_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_6502135E_7CB4_E7ED_4170_198010C883AE_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6502135E_7CB4_E7ED_4170_198010C883AE_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6502135E_7CB4_E7ED_4170_198010C883AE_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6502135E_7CB4_E7ED_4170_198010C883AE_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6502135E_7CB4_E7ED_4170_198010C883AE_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6502135E_7CB4_E7ED_4170_198010C883AE_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6502135E_7CB4_E7ED_4170_198010C883AE_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6502135E_7CB4_E7ED_4170_198010C883AE_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6502135E_7CB4_E7ED_4170_198010C883AE_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6502135E_7CB4_E7ED_4170_198010C883AE_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6502135E_7CB4_E7ED_4170_198010C883AE_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6502135E_7CB4_E7ED_4170_198010C883AE_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_6502135E_7CB4_E7ED_4170_198010C883AE_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6502135E_7CB4_E7ED_4170_198010C883AE_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6502135E_7CB4_E7ED_4170_198010C883AE_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6502135E_7CB4_E7ED_4170_198010C883AE_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6502135E_7CB4_E7ED_4170_198010C883AE_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6502135E_7CB4_E7ED_4170_198010C883AE_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6502135E_7CB4_E7ED_4170_198010C883AE_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6502135E_7CB4_E7ED_4170_198010C883AE_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_6502135E_7CB4_E7ED_4170_198010C883AE_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "vfov": 180,
 "label": "57",
 "id": "panorama_6503B124_7CB4_235D_41D1_00713694601D",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_6503B124_7CB4_235D_41D1_00713694601D_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6503B124_7CB4_235D_41D1_00713694601D_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6503B124_7CB4_235D_41D1_00713694601D_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6503B124_7CB4_235D_41D1_00713694601D_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6503B124_7CB4_235D_41D1_00713694601D_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_6503B124_7CB4_235D_41D1_00713694601D_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6503B124_7CB4_235D_41D1_00713694601D_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6503B124_7CB4_235D_41D1_00713694601D_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6503B124_7CB4_235D_41D1_00713694601D_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6503B124_7CB4_235D_41D1_00713694601D_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6503B124_7CB4_235D_41D1_00713694601D_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6503B124_7CB4_235D_41D1_00713694601D_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6503B124_7CB4_235D_41D1_00713694601D_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6503B124_7CB4_235D_41D1_00713694601D_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6503B124_7CB4_235D_41D1_00713694601D_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6503B124_7CB4_235D_41D1_00713694601D_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6503B124_7CB4_235D_41D1_00713694601D_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_6503B124_7CB4_235D_41D1_00713694601D_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6503B124_7CB4_235D_41D1_00713694601D_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6503B124_7CB4_235D_41D1_00713694601D_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6503B124_7CB4_235D_41D1_00713694601D_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6503B124_7CB4_235D_41D1_00713694601D_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6503B124_7CB4_235D_41D1_00713694601D_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6503B124_7CB4_235D_41D1_00713694601D_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6503B124_7CB4_235D_41D1_00713694601D_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_6503B124_7CB4_235D_41D1_00713694601D_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_66512894_7CB4_217D_41A4_141C847B7AB5_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "75",
 "id": "panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "vfov": 180,
 "label": "39",
 "id": "panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "30",
 "id": "panorama_65004C08_7CB4_2154_41C4_515DD8E22A18",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_65004C08_7CB4_2154_41C4_515DD8E22A18_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65004C08_7CB4_2154_41C4_515DD8E22A18_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65004C08_7CB4_2154_41C4_515DD8E22A18_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65004C08_7CB4_2154_41C4_515DD8E22A18_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_65004C08_7CB4_2154_41C4_515DD8E22A18_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_65004C08_7CB4_2154_41C4_515DD8E22A18_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65004C08_7CB4_2154_41C4_515DD8E22A18_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65004C08_7CB4_2154_41C4_515DD8E22A18_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65004C08_7CB4_2154_41C4_515DD8E22A18_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_65004C08_7CB4_2154_41C4_515DD8E22A18_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65004C08_7CB4_2154_41C4_515DD8E22A18_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65004C08_7CB4_2154_41C4_515DD8E22A18_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65004C08_7CB4_2154_41C4_515DD8E22A18_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_65004C08_7CB4_2154_41C4_515DD8E22A18_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65004C08_7CB4_2154_41C4_515DD8E22A18_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65004C08_7CB4_2154_41C4_515DD8E22A18_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65004C08_7CB4_2154_41C4_515DD8E22A18_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_65004C08_7CB4_2154_41C4_515DD8E22A18_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65004C08_7CB4_2154_41C4_515DD8E22A18_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65004C08_7CB4_2154_41C4_515DD8E22A18_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65004C08_7CB4_2154_41C4_515DD8E22A18_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_65004C08_7CB4_2154_41C4_515DD8E22A18_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65004C08_7CB4_2154_41C4_515DD8E22A18_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65004C08_7CB4_2154_41C4_515DD8E22A18_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65004C08_7CB4_2154_41C4_515DD8E22A18_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_65004C08_7CB4_2154_41C4_515DD8E22A18_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "vfov": 180,
 "label": "36",
 "id": "panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "overlays": [
  "this.overlay_6208A105_7F94_235F_4189_7A7C588CAA49"
 ],
 "label": "67",
 "partial": false,
 "id": "panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_65004C08_7CB4_2154_41C4_515DD8E22A18_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_6502135E_7CB4_E7ED_4170_198010C883AE_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_6504F740_7CB4_6FD5_41CC_983387DB1214_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": -82.83,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 179.62,
   "panorama": "this.panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902"
  },
  {
   "yaw": -178.68,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 5.8,
   "panorama": "this.panorama_77206015_7C75_E8CB_41C6_5A45F81CF834"
  }
 ],
 "label": "4",
 "id": "panorama_7721C854_7C75_F949_41A2_6F10303B3013",
 "class": "Panorama",
 "overlays": [
  "this.overlay_656E184B_7CFC_21EB_41DB_8C7982F97EFA",
  "this.overlay_657B609A_7CFC_E175_41BC_B73EB53B75F4"
 ],
 "vfov": 180,
 "pitch": 0,
 "partial": false,
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_7721C854_7C75_F949_41A2_6F10303B3013_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7721C854_7C75_F949_41A2_6F10303B3013_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7721C854_7C75_F949_41A2_6F10303B3013_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7721C854_7C75_F949_41A2_6F10303B3013_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_7721C854_7C75_F949_41A2_6F10303B3013_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_7721C854_7C75_F949_41A2_6F10303B3013_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7721C854_7C75_F949_41A2_6F10303B3013_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7721C854_7C75_F949_41A2_6F10303B3013_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7721C854_7C75_F949_41A2_6F10303B3013_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7721C854_7C75_F949_41A2_6F10303B3013_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7721C854_7C75_F949_41A2_6F10303B3013_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7721C854_7C75_F949_41A2_6F10303B3013_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7721C854_7C75_F949_41A2_6F10303B3013_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_7721C854_7C75_F949_41A2_6F10303B3013_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7721C854_7C75_F949_41A2_6F10303B3013_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7721C854_7C75_F949_41A2_6F10303B3013_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7721C854_7C75_F949_41A2_6F10303B3013_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_7721C854_7C75_F949_41A2_6F10303B3013_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7721C854_7C75_F949_41A2_6F10303B3013_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7721C854_7C75_F949_41A2_6F10303B3013_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7721C854_7C75_F949_41A2_6F10303B3013_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_7721C854_7C75_F949_41A2_6F10303B3013_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7721C854_7C75_F949_41A2_6F10303B3013_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7721C854_7C75_F949_41A2_6F10303B3013_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7721C854_7C75_F949_41A2_6F10303B3013_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_7721C854_7C75_F949_41A2_6F10303B3013_t.jpg"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "48",
 "id": "panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "vfov": 180,
 "label": "47",
 "id": "panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 1.32,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_703AEF41_7E92_D256_41D1_0F9D24476EEA",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -179.98,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_70094F31_7E92_D236_41A3_97A40D50FC91",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "14",
 "id": "panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "vfov": 180,
 "label": "22",
 "id": "panorama_65075791_7CB4_2F77_41D5_7169365EF5EE",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_65075791_7CB4_2F77_41D5_7169365EF5EE_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65075791_7CB4_2F77_41D5_7169365EF5EE_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65075791_7CB4_2F77_41D5_7169365EF5EE_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65075791_7CB4_2F77_41D5_7169365EF5EE_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_65075791_7CB4_2F77_41D5_7169365EF5EE_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_65075791_7CB4_2F77_41D5_7169365EF5EE_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65075791_7CB4_2F77_41D5_7169365EF5EE_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65075791_7CB4_2F77_41D5_7169365EF5EE_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65075791_7CB4_2F77_41D5_7169365EF5EE_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_65075791_7CB4_2F77_41D5_7169365EF5EE_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65075791_7CB4_2F77_41D5_7169365EF5EE_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65075791_7CB4_2F77_41D5_7169365EF5EE_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65075791_7CB4_2F77_41D5_7169365EF5EE_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_65075791_7CB4_2F77_41D5_7169365EF5EE_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65075791_7CB4_2F77_41D5_7169365EF5EE_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65075791_7CB4_2F77_41D5_7169365EF5EE_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65075791_7CB4_2F77_41D5_7169365EF5EE_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_65075791_7CB4_2F77_41D5_7169365EF5EE_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65075791_7CB4_2F77_41D5_7169365EF5EE_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65075791_7CB4_2F77_41D5_7169365EF5EE_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65075791_7CB4_2F77_41D5_7169365EF5EE_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_65075791_7CB4_2F77_41D5_7169365EF5EE_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65075791_7CB4_2F77_41D5_7169365EF5EE_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65075791_7CB4_2F77_41D5_7169365EF5EE_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65075791_7CB4_2F77_41D5_7169365EF5EE_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_65075791_7CB4_2F77_41D5_7169365EF5EE_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_66512894_7CB4_217D_41A4_141C847B7AB5",
   "class": "AdjacentPanorama"
  }
 ],
 "label": "6",
 "id": "panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB",
 "class": "Panorama",
 "overlays": [
  "this.overlay_67C8AF7B_7CB4_7FAB_41C4_E44CA38424D2",
  "this.overlay_669B642E_7CB4_21AD_41B3_40AABD4F1E02"
 ],
 "vfov": 180,
 "pitch": 0,
 "partial": false,
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_t.jpg"
},
{
 "vfov": 180,
 "label": "54",
 "id": "panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_653D30D6_7CB4_62FD_419D_932F3576E628_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 1.32,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_702B1F52_7E92_D27A_41DC_58100FF74598",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "52",
 "id": "panorama_65054695_7CB4_217F_41DB_C800BA36F500",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_65054695_7CB4_217F_41DB_C800BA36F500_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65054695_7CB4_217F_41DB_C800BA36F500_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65054695_7CB4_217F_41DB_C800BA36F500_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65054695_7CB4_217F_41DB_C800BA36F500_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_65054695_7CB4_217F_41DB_C800BA36F500_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_65054695_7CB4_217F_41DB_C800BA36F500_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65054695_7CB4_217F_41DB_C800BA36F500_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65054695_7CB4_217F_41DB_C800BA36F500_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65054695_7CB4_217F_41DB_C800BA36F500_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_65054695_7CB4_217F_41DB_C800BA36F500_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65054695_7CB4_217F_41DB_C800BA36F500_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65054695_7CB4_217F_41DB_C800BA36F500_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65054695_7CB4_217F_41DB_C800BA36F500_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_65054695_7CB4_217F_41DB_C800BA36F500_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65054695_7CB4_217F_41DB_C800BA36F500_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65054695_7CB4_217F_41DB_C800BA36F500_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65054695_7CB4_217F_41DB_C800BA36F500_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_65054695_7CB4_217F_41DB_C800BA36F500_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65054695_7CB4_217F_41DB_C800BA36F500_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65054695_7CB4_217F_41DB_C800BA36F500_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65054695_7CB4_217F_41DB_C800BA36F500_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_65054695_7CB4_217F_41DB_C800BA36F500_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65054695_7CB4_217F_41DB_C800BA36F500_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65054695_7CB4_217F_41DB_C800BA36F500_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65054695_7CB4_217F_41DB_C800BA36F500_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_65054695_7CB4_217F_41DB_C800BA36F500_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_6503B124_7CB4_235D_41D1_00713694601D_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -0.38,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_70444F79_7E92_D236_414C_8BE855EB7285",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "45",
 "id": "panorama_65043B26_7CB4_275C_41C0_208ED06A59AD",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_65043B26_7CB4_275C_41C0_208ED06A59AD_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65043B26_7CB4_275C_41C0_208ED06A59AD_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65043B26_7CB4_275C_41C0_208ED06A59AD_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65043B26_7CB4_275C_41C0_208ED06A59AD_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_65043B26_7CB4_275C_41C0_208ED06A59AD_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_65043B26_7CB4_275C_41C0_208ED06A59AD_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65043B26_7CB4_275C_41C0_208ED06A59AD_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65043B26_7CB4_275C_41C0_208ED06A59AD_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65043B26_7CB4_275C_41C0_208ED06A59AD_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_65043B26_7CB4_275C_41C0_208ED06A59AD_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65043B26_7CB4_275C_41C0_208ED06A59AD_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65043B26_7CB4_275C_41C0_208ED06A59AD_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65043B26_7CB4_275C_41C0_208ED06A59AD_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_65043B26_7CB4_275C_41C0_208ED06A59AD_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65043B26_7CB4_275C_41C0_208ED06A59AD_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65043B26_7CB4_275C_41C0_208ED06A59AD_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65043B26_7CB4_275C_41C0_208ED06A59AD_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_65043B26_7CB4_275C_41C0_208ED06A59AD_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65043B26_7CB4_275C_41C0_208ED06A59AD_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65043B26_7CB4_275C_41C0_208ED06A59AD_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65043B26_7CB4_275C_41C0_208ED06A59AD_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_65043B26_7CB4_275C_41C0_208ED06A59AD_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65043B26_7CB4_275C_41C0_208ED06A59AD_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65043B26_7CB4_275C_41C0_208ED06A59AD_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65043B26_7CB4_275C_41C0_208ED06A59AD_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_65043B26_7CB4_275C_41C0_208ED06A59AD_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "vfov": 180,
 "label": "20",
 "id": "panorama_650AB660_7CB4_21D5_41D6_77DF25222E74",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_650AB660_7CB4_21D5_41D6_77DF25222E74_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650AB660_7CB4_21D5_41D6_77DF25222E74_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650AB660_7CB4_21D5_41D6_77DF25222E74_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650AB660_7CB4_21D5_41D6_77DF25222E74_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_650AB660_7CB4_21D5_41D6_77DF25222E74_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_650AB660_7CB4_21D5_41D6_77DF25222E74_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650AB660_7CB4_21D5_41D6_77DF25222E74_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650AB660_7CB4_21D5_41D6_77DF25222E74_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650AB660_7CB4_21D5_41D6_77DF25222E74_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_650AB660_7CB4_21D5_41D6_77DF25222E74_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650AB660_7CB4_21D5_41D6_77DF25222E74_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650AB660_7CB4_21D5_41D6_77DF25222E74_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650AB660_7CB4_21D5_41D6_77DF25222E74_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_650AB660_7CB4_21D5_41D6_77DF25222E74_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650AB660_7CB4_21D5_41D6_77DF25222E74_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650AB660_7CB4_21D5_41D6_77DF25222E74_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650AB660_7CB4_21D5_41D6_77DF25222E74_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_650AB660_7CB4_21D5_41D6_77DF25222E74_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650AB660_7CB4_21D5_41D6_77DF25222E74_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650AB660_7CB4_21D5_41D6_77DF25222E74_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650AB660_7CB4_21D5_41D6_77DF25222E74_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_650AB660_7CB4_21D5_41D6_77DF25222E74_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650AB660_7CB4_21D5_41D6_77DF25222E74_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650AB660_7CB4_21D5_41D6_77DF25222E74_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650AB660_7CB4_21D5_41D6_77DF25222E74_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_650AB660_7CB4_21D5_41D6_77DF25222E74_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_6507121F_7CB4_216B_41D1_E489A32A04B6_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "53",
 "id": "panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "vfov": 180,
 "label": "11",
 "id": "panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "vfov": 180,
 "label": "63",
 "id": "panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "vfov": 180,
 "label": "12",
 "id": "panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "62",
 "id": "panorama_65078A23_7CB5_E154_41DD_ADF251B16065",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_65078A23_7CB5_E154_41DD_ADF251B16065_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65078A23_7CB5_E154_41DD_ADF251B16065_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65078A23_7CB5_E154_41DD_ADF251B16065_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65078A23_7CB5_E154_41DD_ADF251B16065_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_65078A23_7CB5_E154_41DD_ADF251B16065_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_65078A23_7CB5_E154_41DD_ADF251B16065_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65078A23_7CB5_E154_41DD_ADF251B16065_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65078A23_7CB5_E154_41DD_ADF251B16065_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65078A23_7CB5_E154_41DD_ADF251B16065_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_65078A23_7CB5_E154_41DD_ADF251B16065_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65078A23_7CB5_E154_41DD_ADF251B16065_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65078A23_7CB5_E154_41DD_ADF251B16065_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65078A23_7CB5_E154_41DD_ADF251B16065_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_65078A23_7CB5_E154_41DD_ADF251B16065_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65078A23_7CB5_E154_41DD_ADF251B16065_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65078A23_7CB5_E154_41DD_ADF251B16065_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65078A23_7CB5_E154_41DD_ADF251B16065_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_65078A23_7CB5_E154_41DD_ADF251B16065_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65078A23_7CB5_E154_41DD_ADF251B16065_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65078A23_7CB5_E154_41DD_ADF251B16065_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65078A23_7CB5_E154_41DD_ADF251B16065_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_65078A23_7CB5_E154_41DD_ADF251B16065_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65078A23_7CB5_E154_41DD_ADF251B16065_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65078A23_7CB5_E154_41DD_ADF251B16065_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65078A23_7CB5_E154_41DD_ADF251B16065_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_65078A23_7CB5_E154_41DD_ADF251B16065_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_6500E888_7CB4_6155_41D4_66E56ECD949B_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "68",
 "id": "panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "28",
 "id": "panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "10",
 "id": "panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "59",
 "id": "panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "vfov": 180,
 "label": "34",
 "id": "panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": 179.62,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 0.02,
   "panorama": "this.panorama_77073E88_7C74_39D8_41D2_EDE228DC3637"
  },
  {
   "panorama": "this.panorama_77206015_7C75_E8CB_41C6_5A45F81CF834",
   "class": "AdjacentPanorama"
  }
 ],
 "label": "2",
 "id": "panorama_774327AD_7C74_17D8_41D4_549B7AFED330",
 "class": "Panorama",
 "overlays": [
  "this.overlay_65E2B5B2_7C94_22B5_41DC_9B3B45724FA0",
  "this.overlay_65E4624D_7CF4_61EF_41D6_61CCEF18DB5D"
 ],
 "vfov": 180,
 "pitch": 0,
 "partial": false,
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_774327AD_7C74_17D8_41D4_549B7AFED330_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_774327AD_7C74_17D8_41D4_549B7AFED330_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_774327AD_7C74_17D8_41D4_549B7AFED330_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_774327AD_7C74_17D8_41D4_549B7AFED330_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_774327AD_7C74_17D8_41D4_549B7AFED330_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_774327AD_7C74_17D8_41D4_549B7AFED330_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_774327AD_7C74_17D8_41D4_549B7AFED330_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_774327AD_7C74_17D8_41D4_549B7AFED330_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_774327AD_7C74_17D8_41D4_549B7AFED330_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_774327AD_7C74_17D8_41D4_549B7AFED330_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_774327AD_7C74_17D8_41D4_549B7AFED330_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_774327AD_7C74_17D8_41D4_549B7AFED330_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_774327AD_7C74_17D8_41D4_549B7AFED330_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_774327AD_7C74_17D8_41D4_549B7AFED330_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_774327AD_7C74_17D8_41D4_549B7AFED330_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_774327AD_7C74_17D8_41D4_549B7AFED330_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_774327AD_7C74_17D8_41D4_549B7AFED330_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_774327AD_7C74_17D8_41D4_549B7AFED330_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_774327AD_7C74_17D8_41D4_549B7AFED330_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_774327AD_7C74_17D8_41D4_549B7AFED330_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_774327AD_7C74_17D8_41D4_549B7AFED330_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_774327AD_7C74_17D8_41D4_549B7AFED330_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_774327AD_7C74_17D8_41D4_549B7AFED330_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_774327AD_7C74_17D8_41D4_549B7AFED330_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_774327AD_7C74_17D8_41D4_549B7AFED330_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_774327AD_7C74_17D8_41D4_549B7AFED330_t.jpg"
},
{
 "vfov": 180,
 "label": "15",
 "id": "panorama_650D5C06_7CB4_215D_41B2_166656AAE85A",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_650D5C06_7CB4_215D_41B2_166656AAE85A_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650D5C06_7CB4_215D_41B2_166656AAE85A_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650D5C06_7CB4_215D_41B2_166656AAE85A_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650D5C06_7CB4_215D_41B2_166656AAE85A_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_650D5C06_7CB4_215D_41B2_166656AAE85A_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_650D5C06_7CB4_215D_41B2_166656AAE85A_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650D5C06_7CB4_215D_41B2_166656AAE85A_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650D5C06_7CB4_215D_41B2_166656AAE85A_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650D5C06_7CB4_215D_41B2_166656AAE85A_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_650D5C06_7CB4_215D_41B2_166656AAE85A_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650D5C06_7CB4_215D_41B2_166656AAE85A_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650D5C06_7CB4_215D_41B2_166656AAE85A_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650D5C06_7CB4_215D_41B2_166656AAE85A_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_650D5C06_7CB4_215D_41B2_166656AAE85A_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650D5C06_7CB4_215D_41B2_166656AAE85A_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650D5C06_7CB4_215D_41B2_166656AAE85A_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650D5C06_7CB4_215D_41B2_166656AAE85A_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_650D5C06_7CB4_215D_41B2_166656AAE85A_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650D5C06_7CB4_215D_41B2_166656AAE85A_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650D5C06_7CB4_215D_41B2_166656AAE85A_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650D5C06_7CB4_215D_41B2_166656AAE85A_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_650D5C06_7CB4_215D_41B2_166656AAE85A_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650D5C06_7CB4_215D_41B2_166656AAE85A_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650D5C06_7CB4_215D_41B2_166656AAE85A_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650D5C06_7CB4_215D_41B2_166656AAE85A_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_650D5C06_7CB4_215D_41B2_166656AAE85A_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "vfov": 180,
 "label": "56",
 "id": "panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 97.17,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_70547F63_7E92_D25A_41DC_6F637BBE850F",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_650390D8_7CB4_62F5_41C7_173AD5E45840_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "27",
 "id": "panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "33",
 "id": "panorama_653B059A_7CB7_E375_41C6_BDA0947533D9",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_653B059A_7CB7_E375_41C6_BDA0947533D9_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_653B059A_7CB7_E375_41C6_BDA0947533D9_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_653B059A_7CB7_E375_41C6_BDA0947533D9_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_653B059A_7CB7_E375_41C6_BDA0947533D9_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_653B059A_7CB7_E375_41C6_BDA0947533D9_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_653B059A_7CB7_E375_41C6_BDA0947533D9_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_653B059A_7CB7_E375_41C6_BDA0947533D9_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_653B059A_7CB7_E375_41C6_BDA0947533D9_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_653B059A_7CB7_E375_41C6_BDA0947533D9_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_653B059A_7CB7_E375_41C6_BDA0947533D9_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_653B059A_7CB7_E375_41C6_BDA0947533D9_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_653B059A_7CB7_E375_41C6_BDA0947533D9_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_653B059A_7CB7_E375_41C6_BDA0947533D9_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_653B059A_7CB7_E375_41C6_BDA0947533D9_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_653B059A_7CB7_E375_41C6_BDA0947533D9_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_653B059A_7CB7_E375_41C6_BDA0947533D9_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_653B059A_7CB7_E375_41C6_BDA0947533D9_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_653B059A_7CB7_E375_41C6_BDA0947533D9_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_653B059A_7CB7_E375_41C6_BDA0947533D9_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_653B059A_7CB7_E375_41C6_BDA0947533D9_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_653B059A_7CB7_E375_41C6_BDA0947533D9_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_653B059A_7CB7_E375_41C6_BDA0947533D9_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_653B059A_7CB7_E375_41C6_BDA0947533D9_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_653B059A_7CB7_E375_41C6_BDA0947533D9_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_653B059A_7CB7_E375_41C6_BDA0947533D9_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_653B059A_7CB7_E375_41C6_BDA0947533D9_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "vfov": 180,
 "label": "74",
 "id": "panorama_650CE384_7CB4_275D_41A6_B7B219AE627E",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_650CE384_7CB4_275D_41A6_B7B219AE627E_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650CE384_7CB4_275D_41A6_B7B219AE627E_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650CE384_7CB4_275D_41A6_B7B219AE627E_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650CE384_7CB4_275D_41A6_B7B219AE627E_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_650CE384_7CB4_275D_41A6_B7B219AE627E_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_650CE384_7CB4_275D_41A6_B7B219AE627E_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650CE384_7CB4_275D_41A6_B7B219AE627E_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650CE384_7CB4_275D_41A6_B7B219AE627E_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650CE384_7CB4_275D_41A6_B7B219AE627E_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_650CE384_7CB4_275D_41A6_B7B219AE627E_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650CE384_7CB4_275D_41A6_B7B219AE627E_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650CE384_7CB4_275D_41A6_B7B219AE627E_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650CE384_7CB4_275D_41A6_B7B219AE627E_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_650CE384_7CB4_275D_41A6_B7B219AE627E_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650CE384_7CB4_275D_41A6_B7B219AE627E_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650CE384_7CB4_275D_41A6_B7B219AE627E_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650CE384_7CB4_275D_41A6_B7B219AE627E_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_650CE384_7CB4_275D_41A6_B7B219AE627E_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650CE384_7CB4_275D_41A6_B7B219AE627E_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650CE384_7CB4_275D_41A6_B7B219AE627E_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650CE384_7CB4_275D_41A6_B7B219AE627E_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_650CE384_7CB4_275D_41A6_B7B219AE627E_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650CE384_7CB4_275D_41A6_B7B219AE627E_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650CE384_7CB4_275D_41A6_B7B219AE627E_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650CE384_7CB4_275D_41A6_B7B219AE627E_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_650CE384_7CB4_275D_41A6_B7B219AE627E_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "vfov": 180,
 "label": "32",
 "id": "panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9",
   "class": "AdjacentPanorama"
  }
 ],
 "label": "8",
 "id": "panorama_650C5189_7CB4_6357_41D5_F6EBB5255754",
 "class": "Panorama",
 "overlays": [
  "this.overlay_66369DAE_7C8C_62AD_41D1_1552C3410B81"
 ],
 "vfov": 180,
 "pitch": 0,
 "partial": false,
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_t.jpg"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_65078A23_7CB5_E154_41DD_ADF251B16065_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "58",
 "id": "panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "vfov": 180,
 "label": "40",
 "id": "panorama_650B4127_7CB4_635B_41D5_3003690AE788",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_650B4127_7CB4_635B_41D5_3003690AE788_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650B4127_7CB4_635B_41D5_3003690AE788_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650B4127_7CB4_635B_41D5_3003690AE788_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650B4127_7CB4_635B_41D5_3003690AE788_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_650B4127_7CB4_635B_41D5_3003690AE788_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_650B4127_7CB4_635B_41D5_3003690AE788_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650B4127_7CB4_635B_41D5_3003690AE788_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650B4127_7CB4_635B_41D5_3003690AE788_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650B4127_7CB4_635B_41D5_3003690AE788_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_650B4127_7CB4_635B_41D5_3003690AE788_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650B4127_7CB4_635B_41D5_3003690AE788_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650B4127_7CB4_635B_41D5_3003690AE788_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650B4127_7CB4_635B_41D5_3003690AE788_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_650B4127_7CB4_635B_41D5_3003690AE788_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650B4127_7CB4_635B_41D5_3003690AE788_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650B4127_7CB4_635B_41D5_3003690AE788_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650B4127_7CB4_635B_41D5_3003690AE788_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_650B4127_7CB4_635B_41D5_3003690AE788_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650B4127_7CB4_635B_41D5_3003690AE788_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650B4127_7CB4_635B_41D5_3003690AE788_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650B4127_7CB4_635B_41D5_3003690AE788_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_650B4127_7CB4_635B_41D5_3003690AE788_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650B4127_7CB4_635B_41D5_3003690AE788_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650B4127_7CB4_635B_41D5_3003690AE788_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650B4127_7CB4_635B_41D5_3003690AE788_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_650B4127_7CB4_635B_41D5_3003690AE788_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "51",
 "id": "panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "vfov": 180,
 "label": "31",
 "id": "panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": 5.8,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -178.68,
   "panorama": "this.panorama_7721C854_7C75_F949_41A2_6F10303B3013"
  },
  {
   "yaw": -179.92,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -178.68,
   "panorama": "this.panorama_7721C854_7C75_F949_41A2_6F10303B3013"
  }
 ],
 "label": "3",
 "id": "panorama_77206015_7C75_E8CB_41C6_5A45F81CF834",
 "class": "Panorama",
 "overlays": [
  "this.overlay_65C44F45_7CF4_1FDF_41B9_87FCAC46CE03",
  "this.overlay_653CBFCB_7CF5_FEEB_41C0_2E6EA6B4A571"
 ],
 "vfov": 180,
 "pitch": 0,
 "partial": false,
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_t.jpg"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "73",
 "id": "panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": -0.38,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_70EFEF0E_7E92_D3EA_41D3_B40A7CDE0561",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_650CE384_7CB4_275D_41A6_B7B219AE627E_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_65075791_7CB4_2F77_41D5_7169365EF5EE_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "media": "this.panorama_77073E88_7C74_39D8_41D2_EDE228DC3637",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_camera"
  },
  {
   "media": "this.panorama_774327AD_7C74_17D8_41D4_549B7AFED330",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_774327AD_7C74_17D8_41D4_549B7AFED330_camera"
  },
  {
   "media": "this.panorama_77206015_7C75_E8CB_41C6_5A45F81CF834",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_camera"
  },
  {
   "media": "this.panorama_7721C854_7C75_F949_41A2_6F10303B3013",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_7721C854_7C75_F949_41A2_6F10303B3013_camera"
  },
  {
   "media": "this.panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_camera"
  },
  {
   "media": "this.panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_camera"
  },
  {
   "media": "this.panorama_66512894_7CB4_217D_41A4_141C847B7AB5",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_66512894_7CB4_217D_41A4_141C847B7AB5_camera"
  },
  {
   "media": "this.panorama_650C5189_7CB4_6357_41D5_F6EBB5255754",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_camera"
  },
  {
   "media": "this.panorama_650CF988_7CB4_6355_41DD_E458C5DF1270",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650CF988_7CB4_6355_41DD_E458C5DF1270_camera"
  },
  {
   "media": "this.panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650CD26E_7CB4_61AD_41CC_44411F117EA6_camera"
  },
  {
   "media": "this.panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808_camera"
  },
  {
   "media": "this.panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB_camera"
  },
  {
   "media": "this.panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61_camera"
  },
  {
   "media": "this.panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650F93F1_7CB4_26B7_41C2_200B619E2E64_camera"
  },
  {
   "media": "this.panorama_650D5C06_7CB4_215D_41B2_166656AAE85A",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650D5C06_7CB4_215D_41B2_166656AAE85A_camera"
  },
  {
   "media": "this.panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED_camera"
  },
  {
   "media": "this.panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411_camera"
  },
  {
   "media": "this.panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0_camera"
  },
  {
   "media": "this.panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618_camera"
  },
  {
   "media": "this.panorama_650AB660_7CB4_21D5_41D6_77DF25222E74",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650AB660_7CB4_21D5_41D6_77DF25222E74_camera"
  },
  {
   "media": "this.panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47_camera"
  },
  {
   "media": "this.panorama_65075791_7CB4_2F77_41D5_7169365EF5EE",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65075791_7CB4_2F77_41D5_7169365EF5EE_camera"
  },
  {
   "media": "this.panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6504A030_7CB4_61B5_41D0_90BA30F013BE_camera"
  },
  {
   "media": "this.panorama_6500E888_7CB4_6155_41D4_66E56ECD949B",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6500E888_7CB4_6155_41D4_66E56ECD949B_camera"
  },
  {
   "media": "this.panorama_653D30D6_7CB4_62FD_419D_932F3576E628",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_653D30D6_7CB4_62FD_419D_932F3576E628_camera"
  },
  {
   "media": "this.panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101_camera"
  },
  {
   "media": "this.panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 26, 27)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1_camera"
  },
  {
   "media": "this.panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 27, 28)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684_camera"
  },
  {
   "media": "this.panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 28, 29)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA_camera"
  },
  {
   "media": "this.panorama_65004C08_7CB4_2154_41C4_515DD8E22A18",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 29, 30)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65004C08_7CB4_2154_41C4_515DD8E22A18_camera"
  },
  {
   "media": "this.panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 30, 31)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650114C7_7CB7_E2DB_41C7_9CB48BB6B828_camera"
  },
  {
   "media": "this.panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 31, 32)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65055CF6_7CB7_E2BD_41DE_8EC0771FB89E_camera"
  },
  {
   "media": "this.panorama_653B059A_7CB7_E375_41C6_BDA0947533D9",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 32, 33)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_653B059A_7CB7_E375_41C6_BDA0947533D9_camera"
  },
  {
   "media": "this.panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 33, 34)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F_camera"
  },
  {
   "media": "this.panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 34, 35)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41_camera"
  },
  {
   "media": "this.panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 35, 36)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6502BFCD_7CB4_3EEF_41BD_CC66807B57A6_camera"
  },
  {
   "media": "this.panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 36, 37)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3_camera"
  },
  {
   "media": "this.panorama_650390D8_7CB4_62F5_41C7_173AD5E45840",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 37, 38)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650390D8_7CB4_62F5_41C7_173AD5E45840_camera"
  },
  {
   "media": "this.panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 38, 39)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B_camera"
  },
  {
   "media": "this.panorama_650B4127_7CB4_635B_41D5_3003690AE788",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 39, 40)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650B4127_7CB4_635B_41D5_3003690AE788_camera"
  },
  {
   "media": "this.panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 40, 41)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13_camera"
  },
  {
   "media": "this.panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 41, 42)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3_camera"
  },
  {
   "media": "this.panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 42, 43)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA_camera"
  },
  {
   "media": "this.panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 43, 44)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6_camera"
  },
  {
   "media": "this.panorama_65043B26_7CB4_275C_41C0_208ED06A59AD",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 44, 45)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65043B26_7CB4_275C_41C0_208ED06A59AD_camera"
  },
  {
   "media": "this.panorama_6502135E_7CB4_E7ED_4170_198010C883AE",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 45, 46)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6502135E_7CB4_E7ED_4170_198010C883AE_camera"
  },
  {
   "media": "this.panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 46, 47)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20_camera"
  },
  {
   "media": "this.panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 47, 48)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6539C4DF_7CB4_E2EC_41DC_03BB997A0819_camera"
  },
  {
   "media": "this.panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 48, 49)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49_camera"
  },
  {
   "media": "this.panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 49, 50)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D_camera"
  },
  {
   "media": "this.panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 50, 51)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65000DF0_7CB4_22B5_41DA_A53F252AF22E_camera"
  },
  {
   "media": "this.panorama_65054695_7CB4_217F_41DB_C800BA36F500",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 51, 52)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65054695_7CB4_217F_41DB_C800BA36F500_camera"
  },
  {
   "media": "this.panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 52, 53)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65044ED6_7CB4_1EFD_41CD_AE7192887D06_camera"
  },
  {
   "media": "this.panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 53, 54)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B_camera"
  },
  {
   "media": "this.panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 54, 55)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9_camera"
  },
  {
   "media": "this.panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 55, 56)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650458F4_7CB4_62BD_41B2_4BC8CF1FBCD2_camera"
  },
  {
   "media": "this.panorama_6503B124_7CB4_235D_41D1_00713694601D",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 56, 57)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6503B124_7CB4_235D_41D1_00713694601D_camera"
  },
  {
   "media": "this.panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 57, 58)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6507F95A_7CB4_23F5_41C9_9E2D053B8A2A_camera"
  },
  {
   "media": "this.panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 58, 59)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1_camera"
  },
  {
   "media": "this.panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 59, 60)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E_camera"
  },
  {
   "media": "this.panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 60, 61)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650B5217_7CB5_E17B_41D1_3BD78D867EFC_camera"
  },
  {
   "media": "this.panorama_65078A23_7CB5_E154_41DD_ADF251B16065",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 61, 62)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65078A23_7CB5_E154_41DD_ADF251B16065_camera"
  },
  {
   "media": "this.panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 62, 63)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650712CE_7CB5_E6ED_41D0_DC044782CE25_camera"
  },
  {
   "media": "this.panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 63, 64)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75_camera"
  },
  {
   "media": "this.panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 64, 65)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C_camera"
  },
  {
   "media": "this.panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 65, 66)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701_camera"
  },
  {
   "media": "this.panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 66, 67)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_camera"
  },
  {
   "media": "this.panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 67, 68)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650D4BBC_7CB4_26AD_41D4_561D54BEC51D_camera"
  },
  {
   "media": "this.panorama_65097514_7CB4_637D_41D3_8408DEE26B49",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 68, 69)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_65097514_7CB4_637D_41D3_8408DEE26B49_camera"
  },
  {
   "media": "this.panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 69, 70)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C_camera"
  },
  {
   "media": "this.panorama_6504F740_7CB4_6FD5_41CC_983387DB1214",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 70, 71)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6504F740_7CB4_6FD5_41CC_983387DB1214_camera"
  },
  {
   "media": "this.panorama_6507121F_7CB4_216B_41D1_E489A32A04B6",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 71, 72)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6507121F_7CB4_216B_41D1_E489A32A04B6_camera"
  },
  {
   "media": "this.panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 72, 73)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650B6A70_7CB4_21B5_41D7_C73521EB2776_camera"
  },
  {
   "media": "this.panorama_650CE384_7CB4_275D_41A6_B7B219AE627E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 73, 74)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_650CE384_7CB4_275D_41A6_B7B219AE627E_camera"
  },
  {
   "media": "this.panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 74, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8_camera"
  }
 ],
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "class": "PlayList"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_650B0AC3_7CB4_26DB_41D7_1ECA8102C684_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "9",
 "id": "panorama_650CF988_7CB4_6355_41DD_E458C5DF1270",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_650CF988_7CB4_6355_41DD_E458C5DF1270_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650CF988_7CB4_6355_41DD_E458C5DF1270_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650CF988_7CB4_6355_41DD_E458C5DF1270_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650CF988_7CB4_6355_41DD_E458C5DF1270_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_650CF988_7CB4_6355_41DD_E458C5DF1270_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_650CF988_7CB4_6355_41DD_E458C5DF1270_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650CF988_7CB4_6355_41DD_E458C5DF1270_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650CF988_7CB4_6355_41DD_E458C5DF1270_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650CF988_7CB4_6355_41DD_E458C5DF1270_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_650CF988_7CB4_6355_41DD_E458C5DF1270_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650CF988_7CB4_6355_41DD_E458C5DF1270_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650CF988_7CB4_6355_41DD_E458C5DF1270_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650CF988_7CB4_6355_41DD_E458C5DF1270_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_650CF988_7CB4_6355_41DD_E458C5DF1270_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650CF988_7CB4_6355_41DD_E458C5DF1270_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650CF988_7CB4_6355_41DD_E458C5DF1270_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650CF988_7CB4_6355_41DD_E458C5DF1270_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_650CF988_7CB4_6355_41DD_E458C5DF1270_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650CF988_7CB4_6355_41DD_E458C5DF1270_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650CF988_7CB4_6355_41DD_E458C5DF1270_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650CF988_7CB4_6355_41DD_E458C5DF1270_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_650CF988_7CB4_6355_41DD_E458C5DF1270_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650CF988_7CB4_6355_41DD_E458C5DF1270_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650CF988_7CB4_6355_41DD_E458C5DF1270_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650CF988_7CB4_6355_41DD_E458C5DF1270_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_650CF988_7CB4_6355_41DD_E458C5DF1270_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "vfov": 180,
 "label": "55",
 "id": "panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_65023039_7CB4_61B7_41BF_A1B23E4F47A9_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "35",
 "id": "panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": 0.02,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 179.62,
   "panorama": "this.panorama_774327AD_7C74_17D8_41D4_549B7AFED330"
  }
 ],
 "label": "1",
 "id": "panorama_77073E88_7C74_39D8_41D2_EDE228DC3637",
 "class": "Panorama",
 "overlays": [
  "this.overlay_6582DF5D_7CBC_3778_41B7_2CDF324D8EB4"
 ],
 "vfov": 180,
 "pitch": 0,
 "partial": false,
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_t.jpg"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_6502E5E3_7CB4_E2DB_41D6_535564243ED0_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_65030225_7CB4_215F_419D_BC5A36B6B8B1_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_6500878D_7CB4_6F6F_41D9_91A0170EFA6B_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "21",
 "id": "panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_65075EC7_7CB4_3EDB_41CE_8538B3D70E47_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "vfov": 180,
 "label": "72",
 "id": "panorama_6507121F_7CB4_216B_41D1_E489A32A04B6",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_6507121F_7CB4_216B_41D1_E489A32A04B6_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6507121F_7CB4_216B_41D1_E489A32A04B6_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6507121F_7CB4_216B_41D1_E489A32A04B6_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6507121F_7CB4_216B_41D1_E489A32A04B6_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6507121F_7CB4_216B_41D1_E489A32A04B6_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_6507121F_7CB4_216B_41D1_E489A32A04B6_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6507121F_7CB4_216B_41D1_E489A32A04B6_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6507121F_7CB4_216B_41D1_E489A32A04B6_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6507121F_7CB4_216B_41D1_E489A32A04B6_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6507121F_7CB4_216B_41D1_E489A32A04B6_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6507121F_7CB4_216B_41D1_E489A32A04B6_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6507121F_7CB4_216B_41D1_E489A32A04B6_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6507121F_7CB4_216B_41D1_E489A32A04B6_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6507121F_7CB4_216B_41D1_E489A32A04B6_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6507121F_7CB4_216B_41D1_E489A32A04B6_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6507121F_7CB4_216B_41D1_E489A32A04B6_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6507121F_7CB4_216B_41D1_E489A32A04B6_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_6507121F_7CB4_216B_41D1_E489A32A04B6_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6507121F_7CB4_216B_41D1_E489A32A04B6_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6507121F_7CB4_216B_41D1_E489A32A04B6_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6507121F_7CB4_216B_41D1_E489A32A04B6_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6507121F_7CB4_216B_41D1_E489A32A04B6_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6507121F_7CB4_216B_41D1_E489A32A04B6_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6507121F_7CB4_216B_41D1_E489A32A04B6_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6507121F_7CB4_216B_41D1_E489A32A04B6_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_6507121F_7CB4_216B_41D1_E489A32A04B6_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_653C5D21_7CB4_E357_41CC_A8E4479BB411_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_774327AD_7C74_17D8_41D4_549B7AFED330_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "38",
 "id": "panorama_650390D8_7CB4_62F5_41C7_173AD5E45840",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_650390D8_7CB4_62F5_41C7_173AD5E45840_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650390D8_7CB4_62F5_41C7_173AD5E45840_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650390D8_7CB4_62F5_41C7_173AD5E45840_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650390D8_7CB4_62F5_41C7_173AD5E45840_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_650390D8_7CB4_62F5_41C7_173AD5E45840_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_650390D8_7CB4_62F5_41C7_173AD5E45840_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650390D8_7CB4_62F5_41C7_173AD5E45840_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650390D8_7CB4_62F5_41C7_173AD5E45840_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650390D8_7CB4_62F5_41C7_173AD5E45840_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_650390D8_7CB4_62F5_41C7_173AD5E45840_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650390D8_7CB4_62F5_41C7_173AD5E45840_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650390D8_7CB4_62F5_41C7_173AD5E45840_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650390D8_7CB4_62F5_41C7_173AD5E45840_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_650390D8_7CB4_62F5_41C7_173AD5E45840_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650390D8_7CB4_62F5_41C7_173AD5E45840_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650390D8_7CB4_62F5_41C7_173AD5E45840_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650390D8_7CB4_62F5_41C7_173AD5E45840_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_650390D8_7CB4_62F5_41C7_173AD5E45840_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650390D8_7CB4_62F5_41C7_173AD5E45840_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650390D8_7CB4_62F5_41C7_173AD5E45840_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650390D8_7CB4_62F5_41C7_173AD5E45840_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_650390D8_7CB4_62F5_41C7_173AD5E45840_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650390D8_7CB4_62F5_41C7_173AD5E45840_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650390D8_7CB4_62F5_41C7_173AD5E45840_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650390D8_7CB4_62F5_41C7_173AD5E45840_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_650390D8_7CB4_62F5_41C7_173AD5E45840_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": -174.2,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "camera_701F3F20_7E92_D3D6_41AB_89BFC8E56C85",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "13",
 "id": "panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_6505BBEF_7CB4_26AB_41B0_C212DC7E8F61_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_6507D1A3_7CB4_235B_41D2_20268CB604B1_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "37",
 "id": "panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_65033811_7CB4_2177_41D6_8EAB229BC3E3_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "vfov": 180,
 "label": "42",
 "id": "panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_650AB1BC_7CB4_22AD_41B0_F93EBB8C7FD3_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": 179.62,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -82.83,
   "panorama": "this.panorama_7721C854_7C75_F949_41A2_6F10303B3013"
  }
 ],
 "label": "5",
 "id": "panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902",
 "class": "Panorama",
 "overlays": [
  "this.overlay_6561147E_7CFC_61AD_41C1_97E0004CD234",
  "this.overlay_669C7B21_7CF4_2757_41C8_84FD1E9796D5"
 ],
 "vfov": 180,
 "pitch": 0,
 "partial": false,
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_t.jpg"
},
{
 "vfov": 180,
 "label": "16",
 "id": "panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_6506C493_7CB4_E17B_41CD_AA842D5705ED_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_65066916_7CB4_637D_41C1_9FC9E1A9F87B_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_652E77EB_7C8C_2EAB_41B4_7EFB1F3672F8_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "60",
 "id": "panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_650A9A1C_7CB4_216D_41B6_5EA668A5154E_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "vfov": 180,
 "label": "43",
 "id": "panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "vfov": 180,
 "label": "25",
 "id": "panorama_653D30D6_7CB4_62FD_419D_932F3576E628",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_653D30D6_7CB4_62FD_419D_932F3576E628_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_653D30D6_7CB4_62FD_419D_932F3576E628_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_653D30D6_7CB4_62FD_419D_932F3576E628_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_653D30D6_7CB4_62FD_419D_932F3576E628_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_653D30D6_7CB4_62FD_419D_932F3576E628_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_653D30D6_7CB4_62FD_419D_932F3576E628_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_653D30D6_7CB4_62FD_419D_932F3576E628_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_653D30D6_7CB4_62FD_419D_932F3576E628_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_653D30D6_7CB4_62FD_419D_932F3576E628_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_653D30D6_7CB4_62FD_419D_932F3576E628_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_653D30D6_7CB4_62FD_419D_932F3576E628_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_653D30D6_7CB4_62FD_419D_932F3576E628_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_653D30D6_7CB4_62FD_419D_932F3576E628_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_653D30D6_7CB4_62FD_419D_932F3576E628_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_653D30D6_7CB4_62FD_419D_932F3576E628_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_653D30D6_7CB4_62FD_419D_932F3576E628_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_653D30D6_7CB4_62FD_419D_932F3576E628_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_653D30D6_7CB4_62FD_419D_932F3576E628_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_653D30D6_7CB4_62FD_419D_932F3576E628_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_653D30D6_7CB4_62FD_419D_932F3576E628_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_653D30D6_7CB4_62FD_419D_932F3576E628_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_653D30D6_7CB4_62FD_419D_932F3576E628_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_653D30D6_7CB4_62FD_419D_932F3576E628_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_653D30D6_7CB4_62FD_419D_932F3576E628_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_653D30D6_7CB4_62FD_419D_932F3576E628_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_653D30D6_7CB4_62FD_419D_932F3576E628_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "vfov": 180,
 "label": "44",
 "id": "panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_6506420C_7CB4_216D_41B9_3D4CC24A51C6_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_650506ED_7CB4_2EAF_41C9_E69F4446CA41_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "49",
 "id": "panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_6537DD59_7CB4_E3F7_417C_F5D09756DD49_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_650D1A6F_7CB4_61AB_41B9_616782D8E808_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_650B4127_7CB4_635B_41D5_3003690AE788_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "24",
 "id": "panorama_6500E888_7CB4_6155_41D4_66E56ECD949B",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_6500E888_7CB4_6155_41D4_66E56ECD949B_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6500E888_7CB4_6155_41D4_66E56ECD949B_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6500E888_7CB4_6155_41D4_66E56ECD949B_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6500E888_7CB4_6155_41D4_66E56ECD949B_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6500E888_7CB4_6155_41D4_66E56ECD949B_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_6500E888_7CB4_6155_41D4_66E56ECD949B_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6500E888_7CB4_6155_41D4_66E56ECD949B_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6500E888_7CB4_6155_41D4_66E56ECD949B_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6500E888_7CB4_6155_41D4_66E56ECD949B_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6500E888_7CB4_6155_41D4_66E56ECD949B_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6500E888_7CB4_6155_41D4_66E56ECD949B_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6500E888_7CB4_6155_41D4_66E56ECD949B_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6500E888_7CB4_6155_41D4_66E56ECD949B_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6500E888_7CB4_6155_41D4_66E56ECD949B_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6500E888_7CB4_6155_41D4_66E56ECD949B_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6500E888_7CB4_6155_41D4_66E56ECD949B_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6500E888_7CB4_6155_41D4_66E56ECD949B_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_6500E888_7CB4_6155_41D4_66E56ECD949B_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6500E888_7CB4_6155_41D4_66E56ECD949B_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6500E888_7CB4_6155_41D4_66E56ECD949B_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6500E888_7CB4_6155_41D4_66E56ECD949B_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6500E888_7CB4_6155_41D4_66E56ECD949B_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6500E888_7CB4_6155_41D4_66E56ECD949B_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6500E888_7CB4_6155_41D4_66E56ECD949B_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6500E888_7CB4_6155_41D4_66E56ECD949B_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_6500E888_7CB4_6155_41D4_66E56ECD949B_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "vfov": 180,
 "label": "50",
 "id": "panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_6501D5C2_7CB4_22D5_41CB_CDC15C92907D_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "vfov": 180,
 "label": "65",
 "id": "panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_6509D364_7CB4_27DD_41C9_D78B02FA839C_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "vfov": 180,
 "label": "66",
 "id": "panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_6506FBAF_7CB4_26AB_41D1_47B26ECF4701_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_7721C854_7C75_F949_41A2_6F10303B3013_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_65051E30_7CB4_E1B5_41B8_CAB3F6A03618_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "26",
 "id": "panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_6507B942_7CB4_63DA_41A3_AF09F2E69101_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_65097514_7CB4_637D_41D3_8408DEE26B49_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_653C4BEB_7CB4_E6AB_41DE_B13B7AF0AB20_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "70",
 "id": "panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_650D7DA2_7CB4_6355_41CC_257882A2EB2C_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_653E7E68_7CB7_E1D5_41C5_9BDC8DB17D1F_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "64",
 "id": "panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_65081B65_7CB5_E7DF_41AE_97997EC98C75_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_651382D2_7CB4_26F5_41D6_97426DE8D8BB_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_650289FF_7CB4_22AC_41DE_278B8FCDEAEA_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "29",
 "id": "panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_650BC352_7CB4_27F5_4181_C8D691C3F6DA_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_650AB660_7CB4_21D5_41D6_77DF25222E74_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "69",
 "id": "panorama_65097514_7CB4_637D_41D3_8408DEE26B49",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_65097514_7CB4_637D_41D3_8408DEE26B49_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65097514_7CB4_637D_41D3_8408DEE26B49_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65097514_7CB4_637D_41D3_8408DEE26B49_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65097514_7CB4_637D_41D3_8408DEE26B49_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_65097514_7CB4_637D_41D3_8408DEE26B49_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_65097514_7CB4_637D_41D3_8408DEE26B49_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65097514_7CB4_637D_41D3_8408DEE26B49_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65097514_7CB4_637D_41D3_8408DEE26B49_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65097514_7CB4_637D_41D3_8408DEE26B49_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_65097514_7CB4_637D_41D3_8408DEE26B49_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65097514_7CB4_637D_41D3_8408DEE26B49_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65097514_7CB4_637D_41D3_8408DEE26B49_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65097514_7CB4_637D_41D3_8408DEE26B49_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_65097514_7CB4_637D_41D3_8408DEE26B49_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65097514_7CB4_637D_41D3_8408DEE26B49_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65097514_7CB4_637D_41D3_8408DEE26B49_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65097514_7CB4_637D_41D3_8408DEE26B49_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_65097514_7CB4_637D_41D3_8408DEE26B49_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65097514_7CB4_637D_41D3_8408DEE26B49_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65097514_7CB4_637D_41D3_8408DEE26B49_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65097514_7CB4_637D_41D3_8408DEE26B49_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_65097514_7CB4_637D_41D3_8408DEE26B49_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_65097514_7CB4_637D_41D3_8408DEE26B49_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_65097514_7CB4_637D_41D3_8408DEE26B49_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_65097514_7CB4_637D_41D3_8408DEE26B49_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_65097514_7CB4_637D_41D3_8408DEE26B49_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "vfov": 180,
 "label": "41",
 "id": "panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13",
 "hfovMin": "120%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_650999B8_7CB4_62B5_41D9_77AA829DDC13_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_65043B26_7CB4_275C_41C0_208ED06A59AD_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "id": "panorama_65054695_7CB4_217F_41DB_C800BA36F500_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "toolTipFontSize": "12px",
 "toolTipOpacity": 1,
 "id": "MainViewer",
 "left": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "width": "100%",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "paddingLeft": 0,
 "minHeight": 50,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionDuration": 500,
 "playbackBarProgressBorderColor": "#000000",
 "minWidth": 100,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "height": "100%",
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "borderSize": 0,
 "playbackBarBorderSize": 0,
 "propagateClick": true,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "shadow": false,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "progressBottom": 0,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "class": "ViewerArea",
 "paddingRight": 0,
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionMode": "blending",
 "displayTooltipInTouchScreens": true,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "top": 0,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "playbackBarHeadOpacity": 1,
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#FFFFFF",
 "playbackBarBottom": 5,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "data": {
  "name": "Main Viewer"
 },
 "paddingBottom": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
 "left": "0%",
 "children": [
  "this.Label_0E9CEE5D_36F3_E64E_419C_5A94FA5D3CA1",
  "this.Container_0542AAAA_3AA3_A6F3_41B2_0E208ADBBBE1"
 ],
 "layout": "absolute",
 "class": "Container",
 "right": "0%",
 "paddingRight": 0,
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "top": 0,
 "verticalAlign": "top",
 "height": 60,
 "backgroundOpacity": 1,
 "backgroundColor": [
  "#050505"
 ],
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "propagateClick": true,
 "shadow": false,
 "paddingBottom": 0,
 "overflow": "visible",
 "data": {
  "name": "--BUTTON SET"
 },
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4",
 "width": 60,
 "layout": "vertical",
 "class": "Container",
 "right": 15,
 "paddingRight": 0,
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "top": 62,
 "verticalAlign": "middle",
 "height": 175,
 "backgroundOpacity": 1,
 "backgroundColor": [
  "#050505"
 ],
 "minWidth": 1,
 "borderRadius": 0,
 "children": [
  "this.Button_485BFF41_598E_3DB2_41A9_33F36E014467",
  "this.Button_4C5C0864_5A8E_C472_41C4_7C0748488A41",
  "this.Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A"
 ],
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "backgroundColorRatios": [
  0.02
 ],
 "gap": 0,
 "scrollBarOpacity": 0.5,
 "propagateClick": false,
 "visible": false,
 "shadow": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "data": {
  "name": "-button set"
 },
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
 "left": "0%",
 "children": [
  "this.IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8",
  "this.IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8"
 ],
 "layout": "horizontal",
 "class": "Container",
 "paddingRight": 30,
 "width": "100%",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "minHeight": 1,
 "verticalAlign": "middle",
 "height": 90,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "contentOpaque": false,
 "borderRadius": 0,
 "bottom": "0%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": true,
 "gap": 3,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-button set container"
 },
 "paddingBottom": 0,
 "shadow": false,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "id": "Container_062AB830_1140_E215_41AF_6C9D65345420",
 "left": "0%",
 "children": [
  "this.Container_062A782F_1140_E20B_41AF_B3E5DE341773",
  "this.Container_062A9830_1140_E215_41A7_5F2BBE5C20E4"
 ],
 "layout": "absolute",
 "class": "Container",
 "right": "0%",
 "paddingRight": 0,
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "top": "0%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0.6,
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "0%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "propagateClick": true,
 "visible": false,
 "shadow": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "data": {
  "name": "---INFO photo"
 },
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
 "left": "0%",
 "children": [
  "this.Container_39A197B1_0C06_62AF_419A_D15E4DDD2528"
 ],
 "layout": "absolute",
 "class": "Container",
 "right": "0%",
 "paddingRight": 0,
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "top": "0%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0.6,
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "0%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "propagateClick": true,
 "visible": false,
 "shadow": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "data": {
  "name": "---PANORAMA LIST"
 },
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_71D0AAF4_7E3A_07B8_41DD_02FFDFA1C984",
 "left": "0%",
 "children": [
  "this.Container_7135233B_7E3E_06A8_41D0_C3388EC531B3",
  "this.Container_71D163FC_7E3A_05A8_41C4_6F71690002CC"
 ],
 "layout": "absolute",
 "class": "Container",
 "right": "0%",
 "paddingRight": 0,
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "top": "0%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#050505"
 ],
 "backgroundOpacity": 0.6,
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "0%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "propagateClick": true,
 "visible": false,
 "shadow": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "data": {
  "name": "Info Photo 1"
 },
 "backgroundColorDirection": "vertical"
},
{
 "iconWidth": 30,
 "rollOverBackgroundOpacity": 1,
 "data": {
  "name": "Button Settings Fullscreen"
 },
 "id": "Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A",
 "width": 60,
 "layout": "horizontal",
 "class": "Button",
 "fontColor": "#FFFFFF",
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "rollOverBackgroundColor": [
  "#050505"
 ],
 "fontFamily": "Arial",
 "pressedIconWidth": 30,
 "paddingLeft": 0,
 "pressedIconURL": "skin/Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A_pressed.png",
 "shadowBlurRadius": 6,
 "horizontalAlign": "center",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "pressedIconHeight": 30,
 "iconHeight": 30,
 "iconURL": "skin/Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A.png",
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "height": 60,
 "backgroundOpacity": 1,
 "iconBeforeLabel": true,
 "mode": "toggle",
 "backgroundColor": [
  "#050505"
 ],
 "minWidth": 1,
 "borderRadius": 0,
 "pressedRollOverBackgroundColor": [
  "#050505"
 ],
 "fontSize": 12,
 "borderColor": "#000000",
 "borderSize": 0,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "paddingBottom": 0,
 "gap": 5,
 "textDecoration": "none",
 "shadow": false,
 "fontStyle": "normal",
 "cursor": "hand",
 "shadowSpread": 1,
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "iconWidth": 30,
 "rollOverBackgroundOpacity": 1,
 "data": {
  "name": "Button Settings Mute"
 },
 "id": "Button_4C5C0864_5A8E_C472_41C4_7C0748488A41",
 "width": 60,
 "layout": "horizontal",
 "class": "Button",
 "fontColor": "#FFFFFF",
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "rollOverBackgroundColor": [
  "#050505"
 ],
 "fontFamily": "Arial",
 "pressedIconWidth": 30,
 "paddingLeft": 0,
 "pressedIconURL": "skin/Button_4C5C0864_5A8E_C472_41C4_7C0748488A41_pressed.png",
 "shadowBlurRadius": 6,
 "horizontalAlign": "center",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "pressedIconHeight": 30,
 "iconHeight": 30,
 "iconURL": "skin/Button_4C5C0864_5A8E_C472_41C4_7C0748488A41.png",
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "height": 60,
 "backgroundOpacity": 1,
 "iconBeforeLabel": true,
 "mode": "toggle",
 "backgroundColor": [
  "#050505"
 ],
 "minWidth": 1,
 "borderRadius": 0,
 "pressedRollOverBackgroundColor": [
  "#050505"
 ],
 "fontSize": 12,
 "borderColor": "#000000",
 "borderSize": 0,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "paddingBottom": 0,
 "gap": 5,
 "textDecoration": "none",
 "shadow": false,
 "fontStyle": "normal",
 "cursor": "hand",
 "shadowSpread": 1,
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "yaw": 5.25,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_66512894_7CB4_217D_41A4_141C847B7AB5_1_HS_0_0_0_map.gif",
      "width": 57,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.1,
   "hfov": 7.32
  }
 ],
 "data": {
  "label": "Circle Point 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_63A14CF2_7D94_62B5_41C9_9BE3AF4FB4A1",
   "pitch": -8.1,
   "yaw": 5.25,
   "hfov": 7.32,
   "distance": 100
  }
 ],
 "id": "overlay_667A7155_7C8C_23FF_41B5_298FFE768382",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "iconWidth": 30,
 "rollOverBackgroundOpacity": 1,
 "data": {
  "name": "Button Settings Gyro"
 },
 "id": "Button_485BFF41_598E_3DB2_41A9_33F36E014467",
 "width": 60,
 "layout": "horizontal",
 "class": "Button",
 "fontColor": "#FFFFFF",
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "rollOverBackgroundColor": [
  "#050505"
 ],
 "fontFamily": "Arial",
 "pressedIconWidth": 30,
 "paddingLeft": 0,
 "pressedIconURL": "skin/Button_485BFF41_598E_3DB2_41A9_33F36E014467_pressed.png",
 "shadowBlurRadius": 6,
 "horizontalAlign": "center",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "pressedIconHeight": 30,
 "iconHeight": 30,
 "iconURL": "skin/Button_485BFF41_598E_3DB2_41A9_33F36E014467.png",
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "height": 60,
 "backgroundOpacity": 1,
 "iconBeforeLabel": true,
 "mode": "toggle",
 "rollOverIconWidth": 30,
 "backgroundColor": [
  "#050505"
 ],
 "minWidth": 1,
 "borderRadius": 0,
 "pressedRollOverBackgroundColor": [
  "#050505"
 ],
 "fontSize": 12,
 "borderColor": "#000000",
 "borderSize": 0,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "paddingBottom": 0,
 "gap": 5,
 "textDecoration": "none",
 "rollOverIconHeight": 30,
 "shadow": false,
 "fontStyle": "normal",
 "cursor": "hand",
 "shadowSpread": 1,
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.setComponentVisibility(this.Container_71D0AAF4_7E3A_07B8_41DD_02FFDFA1C984, true, 0, null, null, false)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "yaw": -62.13,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.36,
   "hfov": 3.77
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_650AA3C2_7CB4_26D5_41D3_AB5EE33BBAC9_0_HS_0_0.png",
      "width": 84,
      "class": "ImageResourceLevel",
      "height": 90
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.36,
   "yaw": -62.13,
   "hfov": 3.77
  }
 ],
 "id": "overlay_6208A105_7F94_235F_4189_7A7C588CAA49",
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 }
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902, this.camera_70EFEF0E_7E92_D3EA_41D3_B40A7CDE0561); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "yaw": -82.83,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7721C854_7C75_F949_41A2_6F10303B3013_0_HS_1_0_0_map.gif",
      "width": 57,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.6,
   "hfov": 5.21
  }
 ],
 "data": {
  "label": "Circle Point 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_6185C4C6_7CFC_62DD_41C5_5F0E03C5633C",
   "pitch": -10.6,
   "yaw": -82.83,
   "hfov": 5.21,
   "distance": 100
  }
 ],
 "id": "overlay_656E184B_7CFC_21EB_41DB_8C7982F97EFA",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_77206015_7C75_E8CB_41C6_5A45F81CF834, this.camera_701F3F20_7E92_D3D6_41AB_89BFC8E56C85); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "yaw": -178.68,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7721C854_7C75_F949_41A2_6F10303B3013_0_HS_2_0_0_map.gif",
      "width": 57,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -28.72,
   "hfov": 11.24
  }
 ],
 "data": {
  "label": "Circle Point 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_62A5E4F6_7E46_03B8_41CC_BB07F33EC352",
   "pitch": -28.72,
   "yaw": -178.68,
   "hfov": 11.24,
   "distance": 100
  }
 ],
 "id": "overlay_657B609A_7CFC_E175_41BC_B73EB53B75F4",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "yaw": -163.95,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_0_HS_0_0_0_map.gif",
      "width": 57,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.61,
   "hfov": 9.17
  }
 ],
 "data": {
  "label": "Circle Point 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_63A63CF1_7D94_62B6_41C6_FD70875396C0",
   "pitch": -14.61,
   "yaw": -163.95,
   "hfov": 9.17,
   "distance": 100
  }
 ],
 "id": "overlay_67C8AF7B_7CB4_7FAB_41C4_E44CA38424D2",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "yaw": 5.05,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_0_HS_1_0_0_map.gif",
      "width": 57,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.24,
   "hfov": 9.96
  }
 ],
 "data": {
  "label": "Circle Point 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5CB07651_7F8C_61F7_41C3_8CED41F3BCEB",
   "pitch": -14.24,
   "yaw": 5.05,
   "hfov": 9.96,
   "distance": 100
  }
 ],
 "id": "overlay_669B642E_7CB4_21AD_41B3_40AABD4F1E02",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "yaw": 1.42,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_774327AD_7C74_17D8_41D4_549B7AFED330_0_HS_1_0_0_map.gif",
      "width": 57,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.55,
   "hfov": 14.84
  }
 ],
 "data": {
  "label": "Circle Point 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_61F0E1BA_7F8D_E2B5_41B1_423F00975F8D",
   "pitch": -14.55,
   "yaw": 1.42,
   "hfov": 14.84,
   "distance": 100
  }
 ],
 "id": "overlay_65E2B5B2_7C94_22B5_41DC_9B3B45724FA0",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_77073E88_7C74_39D8_41D2_EDE228DC3637, this.camera_70094F31_7E92_D236_41A3_97A40D50FC91); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "yaw": 179.62,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_774327AD_7C74_17D8_41D4_549B7AFED330_0_HS_2_0_0_map.gif",
      "width": 57,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.83,
   "hfov": 5.26
  }
 ],
 "data": {
  "label": "Circle Point 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_63A49CF1_7D94_62B7_41D7_3F9173B9BFCC",
   "pitch": -13.83,
   "yaw": 179.62,
   "hfov": 5.26,
   "distance": 100
  }
 ],
 "id": "overlay_65E4624D_7CF4_61EF_41D6_61CCEF18DB5D",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 66)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "yaw": 95.47,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_1_HS_0_0_0_map.gif",
      "width": 57,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.94,
   "hfov": 5.51
  }
 ],
 "data": {
  "label": "Circle Point 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_63A10CF2_7D94_62B5_41C6_BD1E3E5F6E4B",
   "pitch": -8.94,
   "yaw": 95.47,
   "hfov": 5.51,
   "distance": 100
  }
 ],
 "id": "overlay_66369DAE_7C8C_62AD_41D1_1552C3410B81",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_7721C854_7C75_F949_41A2_6F10303B3013, this.camera_703AEF41_7E92_D256_41D1_0F9D24476EEA); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "yaw": 5.8,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_0_HS_1_0_0_map.gif",
      "width": 57,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.63,
   "hfov": 10.09
  }
 ],
 "data": {
  "label": "Circle Point 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5C4FC650_7F8C_61F5_41CD_FBAE459C4AFE",
   "pitch": -15.63,
   "yaw": 5.8,
   "hfov": 10.09,
   "distance": 100
  }
 ],
 "id": "overlay_65C44F45_7CF4_1FDF_41B9_87FCAC46CE03",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_7721C854_7C75_F949_41A2_6F10303B3013, this.camera_702B1F52_7E92_D27A_41DC_58100FF74598); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "yaw": -179.92,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_0_HS_2_0_0_map.gif",
      "width": 57,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.75,
   "hfov": 6.19
  }
 ],
 "data": {
  "label": "Circle Point 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_6EDD8A71_7E34_E068_41CB_52B128FB4EB4",
   "pitch": -14.75,
   "yaw": -179.92,
   "hfov": 6.19,
   "distance": 100
  }
 ],
 "id": "overlay_653CBFCB_7CF5_FEEB_41C0_2E6EA6B4A571",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_774327AD_7C74_17D8_41D4_549B7AFED330, this.camera_70444F79_7E92_D236_414C_8BE855EB7285); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "yaw": 0.02,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_0_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.62,
   "hfov": 7.28
  }
 ],
 "data": {
  "label": "Circle Point 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_60A307FF_7CF4_EEAB_41DC_5F079B08A84E",
   "pitch": -7.62,
   "yaw": 0.02,
   "hfov": 7.28,
   "distance": 100
  }
 ],
 "id": "overlay_6582DF5D_7CBC_3778_41B7_2CDF324D8EB4",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_7721C854_7C75_F949_41A2_6F10303B3013, this.camera_70547F63_7E92_D25A_41DC_6F637BBE850F); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "yaw": 179.62,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_0_HS_0_0_0_map.gif",
      "width": 57,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.41,
   "hfov": 5.96
  }
 ],
 "data": {
  "label": "Circle Point 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_66096B3C_7CFD_E7AD_41CA_4A1A16D3E6AE",
   "pitch": -12.41,
   "yaw": 179.62,
   "hfov": 5.96,
   "distance": 100
  }
 ],
 "id": "overlay_6561147E_7CFC_61AD_41C1_97E0004CD234",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "yaw": 104.17,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_0_HS_1_0_0_map.gif",
      "width": 57,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.66,
   "hfov": 10.23
  }
 ],
 "data": {
  "label": "Circle Point 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_63FB5ABC_7C8C_26AD_41DD_9B7736B02BD8",
   "pitch": -13.66,
   "yaw": 104.17,
   "hfov": 10.23,
   "distance": 100
  }
 ],
 "id": "overlay_669C7B21_7CF4_2757_41C8_84FD1E9796D5",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "fontFamily": "Montserrat",
 "id": "Label_0E9CEE5D_36F3_E64E_419C_5A94FA5D3CA1",
 "left": 76,
 "width": 450,
 "data": {
  "name": "Label Company Name"
 },
 "class": "Label",
 "paddingRight": 0,
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "paddingLeft": 0,
 "text": "PURI AGUNG KERAMBITAN",
 "minHeight": 1,
 "top": "0%",
 "verticalAlign": "middle",
 "height": 60,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "fontSize": 31,
 "borderSize": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "fontStyle": "normal",
 "textDecoration": "none",
 "shadow": false,
 "paddingBottom": 0,
 "fontWeight": "normal"
},
{
 "scrollBarMargin": 2,
 "id": "Container_0542AAAA_3AA3_A6F3_41B2_0E208ADBBBE1",
 "width": 1199,
 "layout": "horizontal",
 "class": "Container",
 "right": "0%",
 "paddingRight": 15,
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "minHeight": 1,
 "top": "0%",
 "verticalAlign": "middle",
 "height": 60,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "children": [
  "this.Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89"
 ],
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": true,
 "gap": 3,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-button set container"
 },
 "shadow": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "maxWidth": 101,
 "id": "IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8",
 "maxHeight": 101,
 "width": 44,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "iconURL": "skin/IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8.png",
 "verticalAlign": "middle",
 "height": 44,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "rollOverIconURL": "skin/IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8_rollover.png",
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, true, 0, null, null, false)",
 "paddingTop": 0,
 "propagateClick": false,
 "transparencyActive": true,
 "data": {
  "name": "IconButton Thumblist"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "maxWidth": 101,
 "id": "IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8",
 "maxHeight": 101,
 "width": 44,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingLeft": 0,
 "pressedIconURL": "skin/IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8_pressed.png",
 "horizontalAlign": "center",
 "minHeight": 1,
 "iconURL": "skin/IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8.png",
 "verticalAlign": "middle",
 "height": 44,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "rollOverIconURL": "skin/IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8_rollover.png",
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, true, 0, null, null, false)",
 "paddingTop": 0,
 "propagateClick": false,
 "transparencyActive": true,
 "data": {
  "name": "IconButton Realtor"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "scrollBarMargin": 2,
 "id": "Container_062A782F_1140_E20B_41AF_B3E5DE341773",
 "left": "15%",
 "children": [
  "this.Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
  "this.Container_26D3A42C_3F86_BA30_419B_2C6BE84D2718",
  "this.Container_062A082F_1140_E20A_4193_DF1A4391DC79"
 ],
 "layout": "horizontal",
 "class": "Container",
 "right": "15%",
 "paddingRight": 0,
 "contentOpaque": false,
 "paddingLeft": 0,
 "shadowBlurRadius": 25,
 "horizontalAlign": "left",
 "minHeight": 1,
 "shadowVerticalLength": 0,
 "shadowHorizontalLength": 0,
 "top": "10%",
 "scrollBarWidth": 10,
 "shadowColor": "#000000",
 "shadowOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "verticalAlign": "top",
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "10%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "paddingBottom": 0,
 "gap": 0,
 "shadow": true,
 "overflow": "scroll",
 "data": {
  "name": "Global"
 },
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_062A9830_1140_E215_41A7_5F2BBE5C20E4",
 "left": "15%",
 "children": [
  "this.IconButton_062A8830_1140_E215_419D_3439F16CCB3E"
 ],
 "layout": "vertical",
 "class": "Container",
 "right": "15%",
 "paddingRight": 20,
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "minHeight": 1,
 "top": "10%",
 "verticalAlign": "top",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "80%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 20,
 "propagateClick": false,
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container X global"
 },
 "shadow": false,
 "paddingBottom": 0,
 "overflow": "visible",
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "id": "Container_39A197B1_0C06_62AF_419A_D15E4DDD2528",
 "left": "15%",
 "children": [
  "this.Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
  "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0"
 ],
 "layout": "absolute",
 "class": "Container",
 "right": "15%",
 "paddingRight": 0,
 "contentOpaque": false,
 "paddingLeft": 0,
 "shadowBlurRadius": 25,
 "horizontalAlign": "center",
 "minHeight": 1,
 "shadowVerticalLength": 0,
 "shadowHorizontalLength": 0,
 "top": "10%",
 "scrollBarWidth": 10,
 "shadowColor": "#000000",
 "shadowOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "verticalAlign": "top",
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "10%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "paddingBottom": 0,
 "gap": 10,
 "shadow": true,
 "overflow": "visible",
 "data": {
  "name": "Global"
 },
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_7135233B_7E3E_06A8_41D0_C3388EC531B3",
 "left": "15%",
 "children": [
  "this.Container_70D6C315_7E3E_0678_41D9_3A1E72320F41",
  "this.Container_70D0C316_7E3E_0678_41D9_DCBCDC2E2810",
  "this.Container_70D0F316_7E3E_0678_41D5_16761540F7B0"
 ],
 "layout": "horizontal",
 "class": "Container",
 "right": "15%",
 "paddingRight": 0,
 "contentOpaque": false,
 "paddingLeft": 0,
 "shadowBlurRadius": 25,
 "horizontalAlign": "left",
 "minHeight": 1,
 "shadowVerticalLength": 0,
 "shadowHorizontalLength": 0,
 "top": "10%",
 "scrollBarWidth": 10,
 "shadowColor": "#000000",
 "shadowOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "verticalAlign": "top",
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "10%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "paddingBottom": 0,
 "gap": 0,
 "shadow": true,
 "overflow": "scroll",
 "data": {
  "name": "Global"
 },
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_71D163FC_7E3A_05A8_41C4_6F71690002CC",
 "left": "15%",
 "children": [
  "this.IconButton_71E983B3_7E3A_05BF_41C6_989D3560FD30"
 ],
 "layout": "vertical",
 "class": "Container",
 "right": "15%",
 "paddingRight": 20,
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "minHeight": 1,
 "top": "10%",
 "verticalAlign": "top",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "80%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 20,
 "propagateClick": false,
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container X global"
 },
 "shadow": false,
 "paddingBottom": 0,
 "overflow": "visible",
 "scrollBarVisible": "rollOver"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_66512894_7CB4_217D_41A4_141C847B7AB5_1_HS_0_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "rowCount": 6,
 "id": "AnimatedImageResource_63A14CF2_7D94_62B5_41C9_9BE3AF4FB4A1",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_7721C854_7C75_F949_41A2_6F10303B3013_0_HS_1_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "rowCount": 6,
 "id": "AnimatedImageResource_6185C4C6_7CFC_62DD_41C5_5F0E03C5633C",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_7721C854_7C75_F949_41A2_6F10303B3013_0_HS_2_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "rowCount": 6,
 "id": "AnimatedImageResource_62A5E4F6_7E46_03B8_41CC_BB07F33EC352",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_0_HS_0_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "rowCount": 6,
 "id": "AnimatedImageResource_63A63CF1_7D94_62B6_41C6_FD70875396C0",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_66CC0B8A_7CF4_2755_41D9_BC100FBF0FCB_0_HS_1_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "rowCount": 6,
 "id": "AnimatedImageResource_5CB07651_7F8C_61F7_41C3_8CED41F3BCEB",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_774327AD_7C74_17D8_41D4_549B7AFED330_0_HS_1_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "rowCount": 6,
 "id": "AnimatedImageResource_61F0E1BA_7F8D_E2B5_41B1_423F00975F8D",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_774327AD_7C74_17D8_41D4_549B7AFED330_0_HS_2_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "rowCount": 6,
 "id": "AnimatedImageResource_63A49CF1_7D94_62B7_41D7_3F9173B9BFCC",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_650C5189_7CB4_6357_41D5_F6EBB5255754_1_HS_0_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "rowCount": 6,
 "id": "AnimatedImageResource_63A10CF2_7D94_62B5_41C6_BD1E3E5F6E4B",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_0_HS_1_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "rowCount": 6,
 "id": "AnimatedImageResource_5C4FC650_7F8C_61F5_41CD_FBAE459C4AFE",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_77206015_7C75_E8CB_41C6_5A45F81CF834_0_HS_2_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "rowCount": 6,
 "id": "AnimatedImageResource_6EDD8A71_7E34_E068_41CB_52B128FB4EB4",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_77073E88_7C74_39D8_41D2_EDE228DC3637_0_HS_1_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "rowCount": 6,
 "id": "AnimatedImageResource_60A307FF_7CF4_EEAB_41DC_5F079B08A84E",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_0_HS_0_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "rowCount": 6,
 "id": "AnimatedImageResource_66096B3C_7CFD_E7AD_41CA_4A1A16D3E6AE",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_7724D0CA_7C75_E958_41D1_23A7F68E2902_0_HS_1_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "rowCount": 6,
 "id": "AnimatedImageResource_63FB5ABC_7C8C_26AD_41DD_9B7736B02BD8",
 "colCount": 4
},
{
 "iconWidth": 17,
 "rollOverBackgroundOpacity": 1,
 "data": {
  "name": "Button Settings"
 },
 "id": "Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89",
 "width": 60,
 "layout": "horizontal",
 "class": "Button",
 "fontColor": "#FFFFFF",
 "click": "if(!this.Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4.get('visible')){ this.setComponentVisibility(this.Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4, false, 0, null, null, false) }",
 "paddingRight": 0,
 "rollOverBackgroundColor": [
  "#050505"
 ],
 "fontFamily": "Arial",
 "paddingLeft": 0,
 "pressedIconURL": "skin/Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89_pressed.png",
 "shadowBlurRadius": 6,
 "horizontalAlign": "center",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "iconHeight": 17,
 "iconURL": "skin/Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89.png",
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "height": 60,
 "backgroundOpacity": 1,
 "iconBeforeLabel": true,
 "mode": "toggle",
 "backgroundColor": [
  "#050505"
 ],
 "minWidth": 1,
 "borderRadius": 0,
 "fontSize": 12,
 "borderColor": "#000000",
 "borderSize": 0,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "paddingBottom": 0,
 "gap": 5,
 "textDecoration": "none",
 "shadow": false,
 "fontStyle": "normal",
 "cursor": "hand",
 "shadowSpread": 1,
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
 "children": [
  "this.Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A"
 ],
 "layout": "absolute",
 "class": "Container",
 "paddingRight": 0,
 "width": "85%",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColor": [
  "#000000"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "middle",
 "height": "100%",
 "minWidth": 1,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "propagateClick": false,
 "paddingBottom": 0,
 "shadow": false,
 "overflow": "scroll",
 "data": {
  "name": "-left"
 },
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_26D3A42C_3F86_BA30_419B_2C6BE84D2718",
 "width": 8,
 "layout": "absolute",
 "class": "Container",
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "contentOpaque": false,
 "backgroundColor": [
  "#050505"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "top",
 "height": "100%",
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "propagateClick": false,
 "paddingBottom": 0,
 "shadow": false,
 "overflow": "scroll",
 "data": {
  "name": "orange line"
 },
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_062A082F_1140_E20A_4193_DF1A4391DC79",
 "children": [
  "this.Container_062A3830_1140_E215_4195_1698933FE51C",
  "this.Container_062A2830_1140_E215_41AA_EB25B7BD381C",
  "this.Container_062AE830_1140_E215_4180_196ED689F4BD"
 ],
 "layout": "vertical",
 "class": "Container",
 "paddingRight": 50,
 "width": "50%",
 "paddingLeft": 50,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "top",
 "height": "100%",
 "minWidth": 460,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#0069A3",
 "paddingTop": 20,
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 0,
 "scrollBarOpacity": 0.51,
 "propagateClick": false,
 "paddingBottom": 20,
 "shadow": false,
 "overflow": "visible",
 "data": {
  "name": "-right"
 },
 "backgroundColorDirection": "vertical"
},
{
 "maxWidth": 60,
 "id": "IconButton_062A8830_1140_E215_419D_3439F16CCB3E",
 "maxHeight": 60,
 "width": "25%",
 "class": "IconButton",
 "paddingRight": 0,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "pressedIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_pressed.jpg",
 "minHeight": 50,
 "iconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E.jpg",
 "height": "75%",
 "verticalAlign": "middle",
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 50,
 "borderRadius": 0,
 "rollOverIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_rollover.jpg",
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "paddingTop": 0,
 "propagateClick": false,
 "transparencyActive": false,
 "data": {
  "name": "X"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "scrollBarMargin": 2,
 "id": "Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
 "children": [
  "this.IconButton_38922473_0C06_2593_4199_C585853A1AB3"
 ],
 "layout": "absolute",
 "class": "Container",
 "paddingRight": 0,
 "width": "100%",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "height": 140,
 "backgroundOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "propagateClick": false,
 "paddingBottom": 0,
 "shadow": false,
 "overflow": "scroll",
 "data": {
  "name": "header"
 },
 "backgroundColorDirection": "vertical"
},
{
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0",
 "left": 0,
 "selectedItemThumbnailShadowVerticalLength": 0,
 "rollOverItemThumbnailShadowColor": "#F7931E",
 "itemLabelFontFamily": "Montserrat",
 "width": "100%",
 "itemMaxHeight": 1000,
 "horizontalAlign": "center",
 "paddingLeft": 70,
 "itemHorizontalAlign": "center",
 "itemBorderRadius": 0,
 "minHeight": 1,
 "selectedItemThumbnailShadowBlurRadius": 16,
 "itemLabelPosition": "bottom",
 "selectedItemLabelFontColor": "#F7931E",
 "selectedItemLabelFontWeight": "bold",
 "height": "92%",
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "playList": "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "minWidth": 1,
 "itemPaddingLeft": 3,
 "itemThumbnailBorderRadius": 0,
 "borderSize": 0,
 "itemBackgroundColor": [],
 "itemWidth": 220,
 "propagateClick": false,
 "itemMinHeight": 50,
 "itemBackgroundColorRatios": [],
 "itemPaddingTop": 3,
 "shadow": false,
 "itemVerticalAlign": "top",
 "itemThumbnailShadow": false,
 "scrollBarMargin": 2,
 "itemLabelTextDecoration": "none",
 "class": "ThumbnailGrid",
 "paddingRight": 70,
 "itemMinWidth": 50,
 "itemLabelFontWeight": "normal",
 "rollOverItemThumbnailShadow": true,
 "itemOpacity": 1,
 "scrollBarWidth": 10,
 "itemThumbnailHeight": 125,
 "itemThumbnailOpacity": 1,
 "itemLabelFontSize": 13,
 "selectedItemThumbnailShadow": true,
 "itemThumbnailScaleMode": "fit_outside",
 "itemLabelFontColor": "#666666",
 "itemThumbnailWidth": 220,
 "borderRadius": 5,
 "itemBackgroundColorDirection": "vertical",
 "bottom": -0.2,
 "itemHeight": 160,
 "scrollBarColor": "#050505",
 "paddingTop": 10,
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "itemPaddingBottom": 3,
 "gap": 26,
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "itemPaddingRight": 3,
 "data": {
  "name": "ThumbnailList"
 },
 "paddingBottom": 70,
 "itemLabelGap": 7,
 "scrollBarOpacity": 0.5,
 "itemLabelFontStyle": "normal",
 "rollOverItemLabelFontColor": "#F7931E",
 "itemLabelHorizontalAlign": "center",
 "itemMaxWidth": 1000,
 "itemBackgroundOpacity": 0,
 "itemMode": "normal",
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "id": "Container_70D6C315_7E3E_0678_41D9_3A1E72320F41",
 "children": [
  "this.Image_70D0A315_7E3E_0678_41DB_E0C65519B060"
 ],
 "layout": "absolute",
 "class": "Container",
 "paddingRight": 0,
 "width": "85%",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColor": [
  "#000000"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "middle",
 "height": "100%",
 "minWidth": 1,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "propagateClick": false,
 "paddingBottom": 0,
 "shadow": false,
 "overflow": "scroll",
 "data": {
  "name": "-left"
 },
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_70D0C316_7E3E_0678_41D9_DCBCDC2E2810",
 "width": 8,
 "layout": "absolute",
 "class": "Container",
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "contentOpaque": false,
 "backgroundColor": [
  "#050505"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "top",
 "height": "100%",
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "propagateClick": false,
 "paddingBottom": 0,
 "shadow": false,
 "overflow": "scroll",
 "data": {
  "name": "orange line"
 },
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_70D0F316_7E3E_0678_41D5_16761540F7B0",
 "children": [
  "this.Container_70D01316_7E3E_0678_41A3_9679FE3C7752",
  "this.Container_70D03316_7E3E_0678_41DA_6932A33E3942",
  "this.Container_70C3F31D_7E3E_0668_41B2_C3A47D85C88B"
 ],
 "layout": "vertical",
 "class": "Container",
 "paddingRight": 50,
 "width": "50%",
 "paddingLeft": 50,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "top",
 "height": "100%",
 "minWidth": 460,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#0069A3",
 "paddingTop": 20,
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 0,
 "scrollBarOpacity": 0.51,
 "propagateClick": false,
 "paddingBottom": 20,
 "shadow": false,
 "overflow": "visible",
 "data": {
  "name": "-right"
 },
 "backgroundColorDirection": "vertical"
},
{
 "maxWidth": 60,
 "id": "IconButton_71E983B3_7E3A_05BF_41C6_989D3560FD30",
 "maxHeight": 60,
 "width": "25%",
 "class": "IconButton",
 "paddingRight": 0,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "pressedIconURL": "skin/IconButton_71E983B3_7E3A_05BF_41C6_989D3560FD30_pressed.jpg",
 "minHeight": 50,
 "iconURL": "skin/IconButton_71E983B3_7E3A_05BF_41C6_989D3560FD30.jpg",
 "height": "75%",
 "verticalAlign": "middle",
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 50,
 "borderRadius": 0,
 "rollOverIconURL": "skin/IconButton_71E983B3_7E3A_05BF_41C6_989D3560FD30_rollover.jpg",
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_71D0AAF4_7E3A_07B8_41DD_02FFDFA1C984, false, 0, null, null, false)",
 "paddingTop": 0,
 "propagateClick": false,
 "transparencyActive": false,
 "data": {
  "name": "X"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "maxWidth": 2000,
 "id": "Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A",
 "left": "0%",
 "maxHeight": 1000,
 "width": "100%",
 "class": "Image",
 "paddingRight": 0,
 "url": "skin/Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A.jpeg",
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "minHeight": 1,
 "top": "0%",
 "height": "100%",
 "verticalAlign": "middle",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "scaleMode": "fit_outside",
 "data": {
  "name": "photo"
 },
 "shadow": false,
 "paddingBottom": 0
},
{
 "scrollBarMargin": 2,
 "id": "Container_062A3830_1140_E215_4195_1698933FE51C",
 "width": "100%",
 "layout": "horizontal",
 "class": "Container",
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "verticalAlign": "top",
 "height": 60,
 "backgroundOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 20,
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 0,
 "scrollBarOpacity": 0.5,
 "propagateClick": false,
 "paddingBottom": 0,
 "shadow": false,
 "overflow": "scroll",
 "data": {
  "name": "Container space"
 },
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_062A2830_1140_E215_41AA_EB25B7BD381C",
 "children": [
  "this.HTMLText_062AD830_1140_E215_41B0_321699661E7F"
 ],
 "layout": "vertical",
 "class": "Container",
 "paddingRight": 0,
 "width": "100%",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "minHeight": 520,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "verticalAlign": "top",
 "height": "100%",
 "minWidth": 100,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#E73B2C",
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 10,
 "scrollBarOpacity": 0.79,
 "propagateClick": false,
 "paddingBottom": 30,
 "shadow": false,
 "overflow": "scroll",
 "data": {
  "name": "Container text"
 },
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_062AE830_1140_E215_4180_196ED689F4BD",
 "width": 370,
 "layout": "horizontal",
 "class": "Container",
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "contentOpaque": false,
 "verticalAlign": "top",
 "height": 40,
 "backgroundOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "propagateClick": false,
 "paddingBottom": 0,
 "shadow": false,
 "overflow": "scroll",
 "data": {
  "name": "Container space"
 },
 "backgroundColorDirection": "vertical"
},
{
 "maxWidth": 60,
 "id": "IconButton_38922473_0C06_2593_4199_C585853A1AB3",
 "maxHeight": 60,
 "width": "100%",
 "class": "IconButton",
 "right": 20,
 "paddingRight": 0,
 "horizontalAlign": "right",
 "paddingLeft": 0,
 "pressedIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed.jpg",
 "minHeight": 50,
 "top": 20,
 "iconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3.jpg",
 "height": "36.14%",
 "verticalAlign": "top",
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 50,
 "borderRadius": 0,
 "rollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_rollover.jpg",
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "paddingTop": 0,
 "propagateClick": false,
 "transparencyActive": false,
 "data": {
  "name": "IconButton X"
 },
 "shadow": false,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "maxWidth": 2000,
 "id": "Image_70D0A315_7E3E_0678_41DB_E0C65519B060",
 "left": "0%",
 "maxHeight": 1000,
 "width": "100%",
 "class": "Image",
 "paddingRight": 0,
 "url": "skin/Image_70D0A315_7E3E_0678_41DB_E0C65519B060.jpeg",
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "minHeight": 1,
 "top": "0%",
 "height": "100%",
 "verticalAlign": "middle",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "scaleMode": "fit_outside",
 "data": {
  "name": "photo"
 },
 "shadow": false,
 "paddingBottom": 0
},
{
 "scrollBarMargin": 2,
 "id": "Container_70D01316_7E3E_0678_41A3_9679FE3C7752",
 "width": "100%",
 "layout": "horizontal",
 "class": "Container",
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "verticalAlign": "top",
 "height": 60,
 "backgroundOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 20,
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 0,
 "scrollBarOpacity": 0.5,
 "propagateClick": false,
 "paddingBottom": 0,
 "shadow": false,
 "overflow": "scroll",
 "data": {
  "name": "Container space"
 },
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_70D03316_7E3E_0678_41DA_6932A33E3942",
 "children": [
  "this.HTMLText_70C3C31D_7E3E_0668_41BB_5786CE1A1A10"
 ],
 "layout": "vertical",
 "class": "Container",
 "paddingRight": 0,
 "width": "100%",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "minHeight": 520,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "verticalAlign": "top",
 "height": "100%",
 "minWidth": 100,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#E73B2C",
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 10,
 "scrollBarOpacity": 0.79,
 "propagateClick": false,
 "paddingBottom": 30,
 "shadow": false,
 "overflow": "scroll",
 "data": {
  "name": "Container text"
 },
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_70C3F31D_7E3E_0668_41B2_C3A47D85C88B",
 "width": 370,
 "layout": "horizontal",
 "class": "Container",
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "contentOpaque": false,
 "verticalAlign": "top",
 "height": 40,
 "backgroundOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "propagateClick": false,
 "paddingBottom": 0,
 "shadow": false,
 "overflow": "scroll",
 "data": {
  "name": "Container space"
 },
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_062AD830_1140_E215_41B0_321699661E7F",
 "width": "100%",
 "class": "HTMLText",
 "paddingRight": 10,
 "paddingLeft": 10,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "height": "100%",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#F7931E",
 "paddingTop": 0,
 "propagateClick": false,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#050505;font-size:7.44vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:3.58vh;font-family:'Montserrat';\"><B>VIRTUAL MAPPING</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:3.58vh;font-family:'Montserrat';\"><B>DESTINASI WISATA</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:3.58vh;font-family:'Montserrat';\"><B>PURI AGUNG</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:3.58vh;font-family:'Montserrat';\"><B>KERAMBITAN</B></SPAN>.</SPAN></DIV><p STYLE=\"margin:0; line-height:1.86vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.86vh;font-family:'Montserrat';\"><B>TIM CAPSTONE :</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.29vh;\">\u2022 I Wayan Aryana Cory</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.29vh;\">\u2022 Gusti Made Wijaya Kusuma </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.29vh;\">\u2022 Surya Bima Putra</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.86vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.86vh;font-family:'Montserrat';\"><B>DOSEN PEMBIMBING :</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.29vh;\">\u2022 IProf. Dr. Ir. Made Sudarma, M.A.Sc, IPU., ASEAN Eng.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.29vh;\">\u2022 I Made Arsa Suyadnya, ST.,M.Eng.</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText"
 },
 "paddingBottom": 20,
 "shadow": false,
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_70C3C31D_7E3E_0668_41BB_5786CE1A1A10",
 "width": "100%",
 "class": "HTMLText",
 "paddingRight": 10,
 "paddingLeft": 10,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "height": "100%",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#F7931E",
 "paddingTop": 0,
 "propagateClick": false,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#050505;font-size:7.44vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:3.58vh;font-family:'Montserrat';\"><B>Tempat Pertemuan Tamu</B></SPAN>.</SPAN></DIV><p STYLE=\"margin:0; line-height:1.86vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.86vh;font-family:'Montserrat';\"><B>Deskripsi :</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.72vh;\">Tempat berkumpul maupun berdiskusi untuk tamu dari Anglurah Puri Agung Kerambitan</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.86vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:1.29vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "data": {
  "name": "HTMLText"
 },
 "paddingBottom": 20,
 "shadow": false,
 "scrollBarVisible": "rollOver"
}],
 "scrollBarColor": "#000000",
 "desktopMipmappingEnabled": false,
 "paddingTop": 0,
 "gap": 10,
 "mouseWheelEnabled": true,
 "backgroundPreloadEnabled": true,
 "scrollBarOpacity": 0.5,
 "mobileMipmappingEnabled": false,
 "propagateClick": true,
 "paddingBottom": 0,
 "shadow": false,
 "overflow": "visible",
 "vrPolyfillScale": 0.5
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
