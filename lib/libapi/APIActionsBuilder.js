const schema = (type, extra) => ({
    type,
    extra
});

/**
 * These are the final schema that would be delivered to the reducer of the respective component.
 *
 * @param schemaSuccess the action schema for the success payload.
 * @param schemaError the action schema for the error payload.
 * @param schemaInProgress the action schema for the in progress payload.
 * @returns {{success: {type, payload, extra}, error: {type, payload, extra}, inprogress: {type, extra}}}
 */
const finalSchema = (schemaSuccess, schemaError, schemaInProgress) => {

    return {
        success: { type: schemaSuccess.type, payload: schemaSuccess.payload, extra: schemaSuccess.extra },
        error: { type: schemaError.type, payload: schemaError.payload, extra: schemaError.extra },
        inprogress: { type: schemaInProgress.type, extra: schemaInProgress.extra }
    };

};

/**
 * This is just a shortcut to the actual APIActionsBuilder.Build() This is the simplified version for the {@link APIActionsBuilder}
 * @param successAction the action representing the success case.
 * @param errorAction the action representing the
 * @param inProgressAction
 * @returns {*}
 */
export const actions = (successAction, errorAction, inProgressAction) => {
    return new APIActionsBuilder(successAction, errorAction, inProgressAction).build();
};

/**
 * These API actions are for the success, failure and in progress case.
 */
class APIActionsBuilder {
    constructor(successType, errorType, inProgressType) {
        this.schemaSuccess = schema(successType);
        this.schemaFailure = schema(errorType);
        this.schemaInProgress = schema(inProgressType);
    }

    /**
     * Add the extra payload to be delivered with the success response payload.
     * @param extra the payload to be delivered along side success.
     * @returns {APIActionsBuilder} to build and provide other payload.
     */
    addSuccessExtra(extra) {
        this.schemaSuccess = schema(this.schemaSuccess.type, extra);
        return this;
    }

    /**
     * Add the extra payload to be delivered with the error response payload.
     * @param extra the payload to be delivered along side failure.
     * @returns {APIActionsBuilder} to build and provide other payload.
     */
    addFailureExtra(extra) {
        this.schemaFailure = schema(this.schemaFailure.type, extra);
        return this;
    }

    /**
     * Add the extra payload to be delivered with the error In progress payload.
     * @param extra the payload to be delivered along side in progress.
     * @returns {APIActionsBuilder} to build and provide other payload.
     */
    addInprogressExtra(extra) {
        this.schemaInProgress = schema(this.schemaInProgress.type, extra);
        return this;
    }

    /**
     * Builds the final schema that would be delivered to the reducer.
     * @returns {{success: {type, payload, extra}, error: {type, payload, extra}, inprogress: {type, extra}}}
     */
    build() {
        return finalSchema(this.schemaSuccess, this.schemaFailure, this.schemaInProgress)
    }
}

export default APIActionsBuilder;
