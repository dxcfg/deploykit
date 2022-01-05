/* Generated for api/certificates/v1beta1/mod.ts */
import {
  ListMeta,
  ObjectMeta,
  Time,
} from "../../../apimachinery/pkg/apis/meta/v1/mod.ts";

/** Describes a certificate signing request */
export type CertificateSigningRequest = {
  apiVersion: "certificates.k8s.io/v1beta1";
  kind: "CertificateSigningRequest";

  metadata?: ObjectMeta;

  /** The certificate request itself and any additional information. */
  spec?: CertificateSigningRequestSpec;

  /** Derived information about the request. */
  status?: CertificateSigningRequestStatus;
};
export function createCertificateSigningRequest<
  T extends Omit<CertificateSigningRequest, "apiVersion" | "kind">,
>(
  data: T,
):
  & CertificateSigningRequest
  & T
  & Pick<CertificateSigningRequest, "apiVersion" | "kind"> {
  return {
    apiVersion: "certificates.k8s.io/v1beta1",
    kind: "CertificateSigningRequest",
    ...data,
  };
}

undefined;
export type CertificateSigningRequestCondition = {
  /** timestamp for the last update to this condition */
  lastUpdateTime?: Time;

  /** human readable message with details about the request state */
  message?: string;

  /** brief reason for the request state */
  reason?: string;

  /** request approval state, currently Approved or Denied. */
  type: string;
};

undefined;
export type CertificateSigningRequestList = {
  apiVersion: "certificates.k8s.io/v1beta1";

  items: CertificateSigningRequest[];
  kind: "CertificateSigningRequestList";

  metadata?: ListMeta;
};
export function createCertificateSigningRequestList<
  T extends Omit<CertificateSigningRequestList, "apiVersion" | "kind">,
>(
  data: T,
):
  & CertificateSigningRequestList
  & T
  & Pick<CertificateSigningRequestList, "apiVersion" | "kind"> {
  return {
    apiVersion: "certificates.k8s.io/v1beta1",
    kind: "CertificateSigningRequestList",
    ...data,
  };
}

/** This information is immutable after the request is created. Only the Request and Usages fields can be set on creation, other fields are derived by Kubernetes and cannot be modified by users. */
export type CertificateSigningRequestSpec = {
  /** Extra information about the requesting user. See user.Info interface for details. */
  extra?: {
    [key: string]: string[];
  };

  /** Group information about the requesting user. See user.Info interface for details. */
  groups?: string[];

  /** Base64-encoded PKCS#10 CSR data */
  request: string;

  /** UID information about the requesting user. See user.Info interface for details. */
  uid?: string;

  /** allowedUsages specifies a set of usage contexts the key will be valid for. See: https:tools.ietf.orghtmlrfc5280#section-4.2.1.3
     https:tools.ietf.orghtmlrfc5280#section-4.2.1.12 */
  usages?: string[];

  /** Information about the requesting user. See user.Info interface for details. */
  username?: string;
};

undefined;
export type CertificateSigningRequestStatus = {
  /** If request was approved, the controller will place the issued certificate here. */
  certificate?: string;

  /** Conditions applied to the request, such as approval or denial. */
  conditions?: CertificateSigningRequestCondition[];
};
