import * as fs from "fs";
import * as vs from "vscode";
import { isWin } from "../../shared/constants";
import { activate, prepareHasRunFile, waitForResult } from "../helpers";

describe("flutter daemon", () => {
	beforeEach(function () {
		if (isWin)
			this.skip();
	});

	beforeEach("activate", () => activate());

	it("runs using custom script", async () => {
		const hasRunFile = prepareHasRunFile("daemon");

		// Restart the extension so the daemon is restarted and will create
		// the hasRun file when it started (since we deleted it in prepareHasRunFile
		// above).
		await vs.commands.executeCommand("_dart.reloadExtension");

		await waitForResult(() => fs.existsSync(hasRunFile));
	});
});
