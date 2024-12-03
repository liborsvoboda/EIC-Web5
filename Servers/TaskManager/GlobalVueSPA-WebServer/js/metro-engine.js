// https://docs.metroui.org.ua/intro.html
//CZECH DISTRIBUTION GroupWare-Solution.Eu && KlikneteZde.CZ

//METRO ENGINE 
let pageLoader;
Metro.storage.setItem('DetectedLanguage', (navigator.language || navigator.userLanguage).substring(0, 2));
if (Metro.storage.getItem('UserAutomaticTranslate', null) == null) { Metro.storage.setItem('UserAutomaticTranslate', false); }
if (Metro.storage.getItem('WebScheme', null) == null) {
	Metro.storage.setItem('WebScheme', "sky-net.css");
	ChangeSchemeTo(Metro.storage.getItem('WebScheme', null));
} else { ChangeSchemeTo(Metro.storage.getItem('WebScheme', null)); }

function UserChangeTranslateSetting() {
	Metro.storage.setItem('UserAutomaticTranslate', $("#UserAutomaticTranslate").val('checked')[0].checked);
}

function hidePageLoading() { Metro.activity.close(pageLoader); }
function showPageLoading() {
	if (pageLoader != undefined) {
		if (pageLoader[0]["DATASET:UID:M4Q"] == undefined) { pageLoader = null; }
		else {
			try { Metro.activity.close(pageLoader); } catch {
				try { pageLoader.close(); } catch { pageLoader = pageLoader[0]["DATASET:UID:M4Q"].dialog; pageLoader.close(); }; pageLoader = null;
			}
		}
	}
	pageLoader = Metro.activity.open({ type: 'atom', style: 'dark', overlayClickClose: true, /*overlayColor: '#fff', overlayAlpha: 1*/ });
}

function ChangeSchemeTo(n) {
	$("#AppPanel").css({ backgroundColor: n.split("?")[1] });
	$("#portal-color-scheme").attr("href", window.location.origin + "/css/schemes/" + n.split("?")[0]);
    $("#scheme-name").html(n.split("?")[0]);
    Metro.storage.setItem('WebScheme', n.split("?")[0]);
}

//Control Translation Panel
function ShowToolPanel(close) {
	$("#UserAutomaticTranslate").val('checked')[0].checked = Metro.storage.getItem('UserAutomaticTranslate', null);
	if (close) { { Metro.bottomsheet.close($('#toolPanel')); } } else {
		if (Metro.bottomsheet.isOpen($('#toolPanel'))) { Metro.bottomsheet.close($('#toolPanel')); }
		else { Metro.bottomsheet.open($('#toolPanel')); }
	}
}

function googleTranslateElementInit() {
    $(document).ready(function () {
        new google.translate.TranslateElement({
            pageLanguage: 'cs', //includedLanguages: 'en,cs',
            layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL,
            autoDisplay: false
        }, 'google_translate_element');

        let autoTranslateSetting = Metro.storage.getItem('UserAutomaticTranslate', null) == null || Metro.storage.getItem('UserAutomaticTranslate', null) == false ? false : true;
        if (autoTranslateSetting && document.querySelector('#google_translate_element select') != null) {
            setTimeout(function () {
                let selectElement = document.querySelector('#google_translate_element select');
                selectElement.value = Metro.storage.getItem('DetectedLanguage', null);
                selectElement.dispatchEvent(new Event('change'));
            }, 1000);
        }
    });
}

function CancelTranslation() {
    setTimeout(function () {
        let selectElement = document.querySelector('#google_translate_element select');
        selectElement.selectedIndex = 1;
        selectElement.dispatchEvent(new Event('change'));
        if (selectElement.value != '') {
            setTimeout(function () {
                let selectElement = document.querySelector('#google_translate_element select');
                selectElement.selectedIndex = 0;
                selectElement.dispatchEvent(new Event('change'));
                if (selectElement.value != '') {
                    setTimeout(function () {
                        let selectElement = document.querySelector('#google_translate_element select');
                        selectElement.selectedIndex = 0;
                        selectElement.dispatchEvent(new Event('change'));
                    }, 2000);
                }
            }, 2000);
        }
    }, 1000);
}