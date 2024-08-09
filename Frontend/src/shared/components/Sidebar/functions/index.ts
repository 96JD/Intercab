import _ from "lodash";

export function getCurrentTab() {
	return _.replace(location.pathname, "/", "");
}
