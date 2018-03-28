
function ExtendableBuiltin(buildInClass) {
    function ExtendableBuiltin() {
        buildInClass.apply(this, arguments);
    }

    return ExtendableBuiltin;
}

export default ExtendableBuiltin;