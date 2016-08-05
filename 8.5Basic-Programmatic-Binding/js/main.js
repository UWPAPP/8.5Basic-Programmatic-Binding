﻿// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509

(function () {
	"use strict";

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;
	var isFirstActivation = true;

	app.onactivated = function (args) {
		if (args.detail.kind === activation.ActivationKind.voiceCommand) {
			// TODO: Handle relevant ActivationKinds. For example, if your app can be started by voice commands,
			// this is a good place to decide whether to populate an input field or choose a different initial view.
		}
		else if (args.detail.kind === activation.ActivationKind.launch) {
			// A Launch activation happens when the user launches your app via the tile
			// or invokes a toast notification by clicking or tapping on the body.
			if (args.detail.arguments) {
				// TODO: If the app supports toasts, use this value from the toast payload to determine where in the app
				// to take the user in response to them invoking a toast notification.
			}
			else if (args.detail.previousExecutionState === activation.ApplicationExecutionState.terminated) {
				// TODO: This application had been suspended and was then terminated to reclaim memory.
				// To create a smooth user experience, restore application state here so that it looks like the app never stopped running.
				// Note: You may want to record the time when the app was last suspended and only restore state if they've returned after a short period.
			}
		}

		if (!args.detail.prelaunchActivated) {
			// TODO: If prelaunchActivated were true, it would mean the app was prelaunched in the background as an optimization.
			// In that case it would be suspended shortly thereafter.
			// Any long-running operations (like expensive network or disk I/O) or changes to user state which occur at launch
			// should be done here (to avoid doing them in the prelaunch case).
			// Alternatively, this work can be done in a resume or visibilitychanged handler.
		}

		if (isFirstActivation) {
			// TODO: The app was activated and had not been running. Do general startup initialization here.
			document.addEventListener("visibilitychange", onVisibilityChanged);
			args.setPromise(WinJS.UI.processAll());
		}

		isFirstActivation = false;
	};

	function onVisibilityChanged(args) {
		if (!document.hidden) {
			// TODO: The app just became visible. This may be a good time to refresh the view.
		}
	}

	app.oncheckpoint = function (args) {
		// TODO: This application is about to be suspended. Save any state that needs to persist across suspensions here.
		// You might use the WinJS.Application.sessionState object, which is automatically saved and restored across suspension.
		// If you need to complete an asynchronous operation before your application is suspended, call args.setPromise().
	};


    //指定数据
	app.onloaded = function () {
	    xInput = document.querySelector(".basicBindingX");
	    yInput = document.querySelector(".basicBindingY");
	    xOutput = document.querySelector(".basicBindingXOutput");
	    yOutput = document.querySelector(".basicBindingYOutput");

	    bindToDataSource();
	    bindToInputChanges();
	}
	app.start();


    
    //初始数据
	var bindSource = WinJS.Binding.as({ x: "initial value for x", y: "initial value for y" });

	var xInput;
	var yInput;
	var xOutput;
	var yOutput;

	function onXChanged(newValue, oldValue) {
	    xOutput.textContent = newValue;
	}

	function onYChanged(newValue, oldValue) {
	    yOutput.textContent = newValue;
	}

    //dataSource进行绑定
	function bindToDataSource() {
	    //bindSource 绑定x,当x的值发生改变的时候，让this执行onXChange的方法
	    bindSource.bind("x", onXChanged.bind(this));
	    bindSource.bind("y", onYChanged.bind(this));
	}

    //输入框发生改变
	function bindToInputChanges() {
	    //WinJS.Utilities.query() 返回一个QueryCollection对象
	    WinJS.Utilities.query(".basicBindingX")
            //给对象添加监听事件
            .listen("change", function () {
                //拿到修改后的bindingX的值，重新赋值给数据源
                bindSource.x = this.value;
            })
            //这里面的e是query()搜索到的内容，遍历并指定e的内容
            .forEach(function (e) {
                e.value = bindSource.x;
            });

	    WinJS.Utilities.query(".basicBindingY")
            .listen("change", function () {
                bindSource.y = this.value;
            })
            .forEach(function (e) {
                e.value = bindSource.y;
            });
	}

})();
