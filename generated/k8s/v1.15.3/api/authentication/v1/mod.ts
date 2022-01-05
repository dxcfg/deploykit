/* Generated for api/authentication/v1/mod.ts */
import { ObjectMeta } from "../../../apimachinery/pkg/apis/meta/v1/mod.ts";

/** TokenReview attempts to authenticate a token to a known user. Note: TokenReview requests may be cached by the webhook token authenticator plugin in the kube-apiserver. */
export type TokenReview = {
  apiVersion: "authentication.k8s.io/v1";
  kind: "TokenReview";

  metadata?: ObjectMeta;

  /** Spec holds information about the request being evaluated */
  spec: TokenReviewSpec;

  /** Status is filled in by the server and indicates whether the request can be authenticated. */
  status?: TokenReviewStatus;
};
export function createTokenReview<
  T extends Omit<TokenReview, "apiVersion" | "kind">,
>(data: T): TokenReview & T & Pick<TokenReview, "apiVersion" | "kind"> {
  return {
    apiVersion: "authentication.k8s.io/v1",
    kind: "TokenReview",
    ...data,
  };
}

/** TokenReviewSpec is a description of the token authentication request. */
export type TokenReviewSpec = {
  /** Audiences is a list of the identifiers that the resource server presented with the token identifies as. Audience-aware token authenticators will verify that the token was intended for at least one of the audiences in this list. If no audiences are provided, the audience will default to the audience of the Kubernetes apiserver. */
  audiences?: string[];

  /** Token is the opaque bearer token. */
  token?: string;
};

/** TokenReviewStatus is the result of the token authentication request. */
export type TokenReviewStatus = {
  /** Audiences are audience identifiers chosen by the authenticator that are compatible with both the TokenReview and token. An identifier is any identifier in the intersection of the TokenReviewSpec audiences and the token's audiences. A client of the TokenReview API that sets the spec.audiences field should validate that a compatible audience identifier is returned in the status.audiences field to ensure that the TokenReview server is audience aware. If a TokenReview returns an empty status.audience field where status.authenticated is "true", the token is valid against the audience of the Kubernetes API server. */
  audiences?: string[];

  /** Authenticated indicates that the token was associated with a known user. */
  authenticated?: boolean;

  /** Error indicates that the token couldn't be checked */
  error?: string;

  /** User is the UserInfo associated with the provided token. */
  user?: UserInfo;
};

/** UserInfo holds the information about the user needed to implement the user.Info interface. */
export type UserInfo = {
  /** Any additional information provided by the authenticator. */
  extra?: {
    [key: string]: string[];
  };

  /** The names of groups this user is a part of. */
  groups?: string[];

  /** A unique value that identifies this user across time. If this user is deleted and another user by the same name is added, they will have different UIDs. */
  uid?: string;

  /** The name that uniquely identifies this user among all active users. */
  username?: string;
};
