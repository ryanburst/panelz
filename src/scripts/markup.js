const PANELZ_MARKUP = `
    <div class="tutorial tutorial--hidden">
        <div class="tutorial__panel">
            <div class="tutorial__cta">
                <button class="tutorial__button tutorial__button--skip" data-tutorial-done>Skip</button>
            </div>
            <div class="tutorial__content">
                <div class="heading heading--lg">Welcome to Panelz</div>
                <div class="heading heading--secondary">Here are some terms you might not know to get you started:</div>
                <p><strong>Panel Zoom</strong> - This mode will guide you along your comic, panel by panel.</p>
                <p><strong>Page Mode</strong> - View the full page and all of its panels as you read.</p>
            </div>
            <div class="tutorial__cta">
                <button class="tutorial__button tutorial__button--back" style="visibility: hidden">Back</button>
                <ul class="tutorial__progress">
                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>
                    <li class="tutorial__progress-step"></li>
                    <li class="tutorial__progress-step"></li>
                </ul>
                <button class="tutorial__button" data-tutorial-next>Next</button>
            </div>
        </div>
        <div class="tutorial__panel tutorial__panel--hidden">
            <div class="tutorial__cta">
                <button class="tutorial__button tutorial__button--skip" data-tutorial-done>Skip</button>
            </div>
            <div class="tutorial__content">
                <div class="tutorial__image">
                    <img src="/panelz/dist/images/tutorial-taps.png" />
                </div>
                <p><strong>Tap Left</strong> - Navigates backwards one panel or page.</p>
                <p><strong>Tap Right</strong> - Navigates forward one panel or page.</p>
                <p><strong>Tap Center</strong> - Open or close the menu options.</p>
                <p><strong>Double Tap (anywhere)</strong> - Switch between page and Panel Zoom mode.</p>
            </div>
            <div class="tutorial__cta">
                <button class="tutorial__button tutorial__button--back" data-tutorial-back>Back</button>
                <ul class="tutorial__progress">
                    <li class="tutorial__progress-step"></li>
                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>
                    <li class="tutorial__progress-step"></li>
                </ul>
                <button class="tutorial__button" data-tutorial-next>Next</button>
            </div>
        </div>
        <div class="tutorial__panel tutorial__panel--hidden">
            <div class="tutorial__content">
                <div class="heading heading--secondary">You can also swipe to navigate!</div>
                <div class="tutorial__image">
                    <img src="/panelz/dist/images/tutorial-swipes.png" />
                </div>
                <p><strong>Swipe Left</strong> - Navigates forward one panel or page.</p>
                <p><strong>Swipe Right</strong> - Navigates backward one panel or page.</p>
            </div>
            <div class="tutorial__cta">
                <button class="tutorial__button tutorial__button--back" data-tutorial-back>Back</button>
                <ul class="tutorial__progress">
                    <li class="tutorial__progress-step"></li>
                    <li class="tutorial__progress-step"></li>
                    <li class="tutorial__progress-step tutorial__progress-step--active"></li>
                </ul>
                <button class="tutorial__button" data-tutorial-done>Done</button>
            </div>
        </div>
    </div>
    <div class="viewport">
        <div class="viewport__interactable"></div>
        <div class="letterbox">
            <div class="letterbox__horizontal letterbox__horizontal--top"></div>
            <div class="letterbox__horizontal letterbox__horizontal--bottom"></div>
            <div class="letterbox__vertical letterbox__vertical--left"></div>
            <div class="letterbox__vertical letterbox__vertical--right"></div>
        </div>
        <div class="viewport__message viewport__message--hide message">
            <div class="message__text">Panel Zoom mode activated.</div>
        </div>
        <ul class="viewport__menu menu">
            <li class="menu__list-item">
                <div href="#" class="menu__option" data-open-pane="pages">
                    <i class="fa fa-clone menu__icon" aria-hidden="true"></i>
                </div>
            </li>
            <li class="menu__list-item">
                <div class="menu__option menu__option--panel-zoom">
                    Panel<br />Zoom
                </div>
            </li>
            <li class="menu__list-item">
                <div class="menu__option" data-open-pane="settings">
                    <i class="fa fa-sliders menu__icon" aria-hidden="true"></i>
                </div>
            </li>
        </ul>
        <div class="panes">
            <div class="panes__pane pane pane--pages pane--hidden">
                <div class="pane__container">
                    <div class="pane__header">
                        <span>Pages</span>
                        <span class="pane__close" data-close>
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div class="pane__content">
                        <ul class="page-list">
                            <li class="page-list__page page-list__page--template" data-skip-to-page="">
                                <img src="" class="page-list__image" />
                                <span class="page-list__number"></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="panes__pane pane pane--settings pane--full pane--hidden">
                <div class="pane__container">
                    <div class="pane__header">
                        <span>Settings</span>
                        <span class="pane__close" data-close>
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div class="pane__content">
                        <div class="pane__heading">General</div>
                        <ul class="pane__menu">
                            <li class="pane__item">
                                <div class="pane__text">
                                    <p class="pane__option">Left-Handed Mode</p>
                                    <p class="pane__helper-text">Switches the page advancement panel to the left-hand side.</p>
                                </div>
                                <div class="checkbox">
                                  <input type="checkbox" value="true" id="leftHanded" name="leftHandMode" />
                                  <label for="leftHanded" class="checkbox__label"></label>
                                </div>
                            </li>
                            <li class="pane__item" data-open-pane="tutorial">
                                <div class="pane__text">
                                    <p class="pane__option">Tutorial</p>
                                    <p class="pane__helper-text">Toggles the tutorial screens on or off</p>
                                </div>
                            </li>
                            <li class="pane__item" data-open-pane="reset">
                                <div class="pane__text">
                                    <p class="pane__option">Reset</p>
                                    <p class="pane__helper-text">Resets all app settings to their defaults</p>
                                </div>
                            </li>
                            <li class="pane__item" data-open-pane="clearData">
                                <div class="pane__text">
                                    <p class="pane__option">Clear Data</p>
                                    <p class="pane__helper-text">Clears all data, including local storage and all user settings</p>
                                </div>
                            </li>
                        </ul>
                        <div class="pane__heading">Panel Zoom</div>
                        <ul class="pane__menu">
                            <li class="pane__item">
                                <div class="pane__text">
                                    <p class="pane__option">Start new books in Panel Zoom Mode</p>
                                </div>
                                <div class="checkbox">
                                  <input type="checkbox" value="true" id="startInPanelZoom" name="startInPanelZoom" />
                                  <label for="startInPanelZoom" class="checkbox__label"></label>
                                </div>
                            </li>
                            <li class="pane__item" data-open-pane="animations">
                                <div class="pane__text">
                                    <p class="pane__option">Animate Transitions</p>
                                    <p class="pane__helper-text">Animate panel-to-panel transitions in Panel Zoom mode</p>
                                </div>
                            </li>
                            <li class="pane__item" data-open-pane="letterboxing">
                                <div class="pane__text">
                                    <p class="pane__option">Letterboxing</p>
                                    <p class="pane__helper-text">Use bars to mask content outside of the current panel</p>
                                </div>
                            </li>
                            <li class="pane__item">
                                <div class="pane__text">
                                    <p class="pane__option">Show page on enter</p>
                                    <p class="pane__helper-text">Show full page on transitioning to a new page</p>
                                </div>
                                <div class="checkbox">
                                  <input type="checkbox" value="true" id="showPageOnEnter" name="showPageOnEnter" />
                                  <label for="showPageOnEnter" class="checkbox__label"></label>
                                </div>
                            </li>
                            <li class="pane__item">
                                <div class="pane__text">
                                    <p class="pane__option">Show page on exit</p>
                                    <p class="pane__helper-text">Show full page before transitioning to a new page</p>
                                </div>
                                <div class="checkbox">
                                  <input type="checkbox" value="true" id="showPageOnExit" name="showPageOnExit" />
                                  <label for="showPageOnExit" class="checkbox__label"></label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="panes__pane pane pane--tutorial pane--modal pane--hidden">
                <div class="pane__container">
                    <div class="pane__header">
                        <span>Tutorial</span>
                    </div>
                    <div class="pane__content">
                        <ul class="pane__menu">
                            <li class="pane__item">
                                <div class="pane__text">
                                    <p class="pane__option">Show</p>
                                </div>
                                <div class="radio">
                                  <input type="radio" value="true" id="show-tutorial" name="showTutorial" />
                                  <label for="show-tutorial" class="radio__label"></label>
                                </div>
                            </li>
                            <li class="pane__item">
                                <div class="pane__text">
                                    <p class="pane__option">Hide</p>
                                </div>
                                <div class="radio">
                                  <input type="radio" value="false" id="hide-tutorial" name="showTutorial" />
                                  <label for="hide-tutorial" class="radio__label"></label>
                                </div>
                            </li>
                        </ul>
                        <div class="pane__actions">
                            <button class="pane__button" data-close>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panes__pane pane pane--letterboxing pane--modal pane--hidden">
                <div class="pane__container">
                    <div class="pane__header">
                        <span>Letterboxing</span>
                    </div>
                    <div class="pane__content">
                        <ul class="pane__menu">
                            <li class="pane__item">
                                <div class="pane__text">
                                    <p class="pane__option">No letterboxing</p>
                                </div>
                                <div class="radio">
                                  <input type="radio" value="no" id="no-letterboxing" name="letterboxing" />
                                  <label for="no-letterboxing" class="radio__label"></label>
                                </div>
                            </li>
                            <li class="pane__item">
                                <div class="pane__text">
                                    <p class="pane__option">Solid letterboxing</p>
                                </div>
                                <div class="radio">
                                  <input type="radio" value="solid" id="solid-letterboxing" name="letterboxing"/>
                                  <label for="solid-letterboxing" class="radio__label"></label>
                                </div>
                            </li>
                            <li class="pane__item">
                                <div class="pane__text">
                                    <p class="pane__option">Opaque letterboxing</p>
                                </div>
                                <div class="radio">
                                  <input type="radio" value="opaque" id="opaque-letterboxing" name="letterboxing" />
                                  <label for="opaque-letterboxing" class="radio__label"></label>
                                </div>
                            </li>
                        </ul>
                        <div class="pane__actions">
                            <button class="pane__button" data-close>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panes__pane pane pane--animations pane--modal pane--hidden">
                <div class="pane__container">
                    <div class="pane__header">
                        <span>Animate Transitions</span>
                    </div>
                    <div class="pane__content">
                        <ul class="pane__menu">
                            <li class="pane__item">
                                <div class="pane__text">
                                    <p class="pane__option">No animation</p>
                                </div>
                                <div class="radio">
                                  <input type="radio" value="0" id="no-animation" name="panelTransitions" />
                                  <label for="no-animation" class="radio__label"></label>
                                </div>
                            </li>
                            <li class="pane__item">
                                <div class="pane__text">
                                    <p class="pane__option">Fast animations</p>
                                </div>
                                <div class="radio">
                                  <input type="radio" value="250" id="fast-animation" name="panelTransitions" />
                                  <label for="fast-animation" class="radio__label"></label>
                                </div>
                            </li>
                            <li class="pane__item">
                                <div class="pane__text">
                                    <p class="pane__option">Slow animations</p>
                                </div>
                                <div class="radio">
                                  <input type="radio" value="650" id="slow-animation" name="panelTransitions" />
                                  <label for="slow-animation" class="radio__label"></label>
                                </div>
                            </li>
                        </ul>
                        <div class="pane__actions">
                            <button class="pane__button" data-close>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panes__pane pane pane--reset pane--modal pane--hidden">
                <div class="pane__container">
                    <div class="pane__header">
                        <span>Reset Settings</span>
                    </div>
                    <div class="pane__content">
                        <p>Are you sure you want to reset to the default settings?</p>
                        <div class="pane__actions">
                            <button class="pane__button" data-close>Cancel</button>
                            <button class="pane__button" data-close data-reset-settings>Reset</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panes__pane pane pane--clearData pane--modal pane--hidden">
                <div class="pane__container">
                    <div class="pane__header">
                        <span>Clear Data</span>
                    </div>
                    <div class="pane__content">
                        <p>Are you sure you want to clear all application data?</p>
                        <div class="pane__actions">
                            <button class="pane__button" data-close>Cancel</button>
                            <button class="pane__button" data-close data-clear-data>Clear</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
