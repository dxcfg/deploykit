/* Generated for api/extensions/v1beta1/mod.ts */
import { IntOrString } from "../../../apimachinery/pkg/util/intstr/mod.ts";
import {
  ListMeta,
  ObjectMeta,
} from "../../../apimachinery/pkg/apis/meta/v1/mod.ts";
import {
  LoadBalancerStatus,
  TypedLocalObjectReference,
} from "../../core/v1/mod.ts";

/** HTTPIngressPath associates a path with a backend. Incoming urls matching the path are forwarded to the backend. */
export type HTTPIngressPath = {
  /** Backend defines the referenced service endpoint to which the traffic will be forwarded to. */
  backend: IngressBackend;

  /** Path is matched against the path of an incoming request. Currently it can contain characters disallowed from the conventional "path" part of a URL as defined by RFC 3986. Paths must begin with a ''. When unspecified, all paths from incoming requests are matched. */
  path?: string;

  /** PathType determines the interpretation of the Path matching. PathType can be one of the following values: * Exact: Matches the URL path exactly. * Prefix: Matches based on a URL path prefix split by ''. Matching is
  done on a path element by element basis. A path element refers is the
  list of labels in the path split by the '' separator. A request is a
  match for path p if every p is an element-wise prefix of p of the
  request path. Note that if the last element of the path is a substring
  of the last element in request path, it is not a match (e.g. foobar
  matches foobarbaz, but does not match foobarbaz).
* ImplementationSpecific: Interpretation of the Path matching is up to
  the IngressClass. Implementations can treat this as a separate PathType
  or treat it identically to Prefix or Exact path types.
Implementations are required to support all path types. Defaults to ImplementationSpecific. */
  pathType?: string;
};

/** HTTPIngressRuleValue is a list of http selectors pointing to backends. In the example: http:<host><path>?<searchpart> -> backend where where parts of the url correspond to RFC 3986, this resource will be used to match against everything after the last '' and before the first '?' or '#'. */
export type HTTPIngressRuleValue = {
  /** A collection of paths that map requests to backends. */
  paths: HTTPIngressPath[];
};

/** Ingress is a collection of rules that allow inbound connections to reach the endpoints defined by a backend. An Ingress can be configured to give services externally-reachable urls, load balance traffic, terminate SSL, offer name based virtual hosting etc. DEPRECATED - This group version of Ingress is deprecated by networking.k8s.iov1beta1 Ingress. See the release notes for more information. */
export type Ingress = {
  apiVersion: "extensions/v1beta1";
  kind: "Ingress";

  /** Standard object's metadata. More info: https:git.k8s.iocommunitycontributorsdevelsig-architectureapi-conventions.md#metadata */
  metadata?: ObjectMeta;

  /** Spec is the desired state of the Ingress. More info: https:git.k8s.iocommunitycontributorsdevelsig-architectureapi-conventions.md#spec-and-status */
  spec?: IngressSpec;

  /** Status is the current state of the Ingress. More info: https:git.k8s.iocommunitycontributorsdevelsig-architectureapi-conventions.md#spec-and-status */
  status?: IngressStatus;
};
export function createIngress<T extends Omit<Ingress, "apiVersion" | "kind">>(
  data: T,
): Ingress & T & Pick<Ingress, "apiVersion" | "kind"> {
  return { apiVersion: "extensions/v1beta1", kind: "Ingress", ...data };
}

/** IngressBackend describes all endpoints for a given service and port. */
export type IngressBackend = {
  /** Resource is an ObjectRef to another Kubernetes resource in the namespace of the Ingress object. If resource is specified, serviceName and servicePort must not be specified. */
  resource?: TypedLocalObjectReference;

  /** Specifies the name of the referenced service. */
  serviceName?: string;

  /** Specifies the port of the referenced service. */
  servicePort?: IntOrString;
};

/** IngressList is a collection of Ingress. */
export type IngressList = {
  apiVersion: "extensions/v1beta1";

  /** Items is the list of Ingress. */
  items: Ingress[];
  kind: "IngressList";

  /** Standard object's metadata. More info: https:git.k8s.iocommunitycontributorsdevelsig-architectureapi-conventions.md#metadata */
  metadata?: ListMeta;
};
export function createIngressList<
  T extends Omit<IngressList, "apiVersion" | "kind">,
>(data: T): IngressList & T & Pick<IngressList, "apiVersion" | "kind"> {
  return { apiVersion: "extensions/v1beta1", kind: "IngressList", ...data };
}

/** IngressRule represents the rules mapping the paths under a specified host to the related backend services. Incoming requests are first evaluated for a host match, then routed to the backend associated with the matching IngressRuleValue. */
export type IngressRule = {
  /** Host is the fully qualified domain name of a network host, as defined by RFC 3986. Note the following deviations from the "host" part of the URI as defined in RFC 3986: 1. IPs are not allowed. Currently an IngressRuleValue can only apply to
   the IP in the Spec of the parent Ingress.
2. The `:` delimiter is not respected because ports are not allowed.
	  Currently the port of an Ingress is implicitly :80 for http and
	  :443 for https.
Both these may change in the future. Incoming requests are matched against the host before the IngressRuleValue. If the host is unspecified, the Ingress routes all traffic based on the specified IngressRuleValue.

Host can be "precise" which is a domain name without the terminating dot of a network host (e.g. "foo.bar.com") or "wildcard", which is a domain name prefixed with a single wildcard label (e.g. "*.foo.com"). The wildcard character '*' must appear by itself as the first DNS label and matches only a single label. You cannot have a wildcard label by itself (e.g. Host == "*"). Requests will be matched against the Host field in the following way: 1. If Host is precise, the request matches this rule if the http host header is equal to Host. 2. If Host is a wildcard, then the request matches this rule if the http host header is to equal to the suffix (removing the first label) of the wildcard rule. */
  host?: string;

  http?: HTTPIngressRuleValue;
};

/** IngressSpec describes the Ingress the user wishes to exist. */
export type IngressSpec = {
  /** A default backend capable of servicing requests that don't match any rule. At least one of 'backend' or 'rules' must be specified. This field is optional to allow the loadbalancer controller or defaulting logic to specify a global default. */
  backend?: IngressBackend;

  /** IngressClassName is the name of the IngressClass cluster resource. The associated IngressClass defines which controller will implement the resource. This replaces the deprecated `kubernetes.ioingress.class` annotation. For backwards compatibility, when that annotation is set, it must be given precedence over this field. The controller may emit a warning if the field and annotation have different values. Implementations of this API should ignore Ingresses without a class specified. An IngressClass resource may be marked as default, which can be used to set a default value for this field. For more information, refer to the IngressClass documentation. */
  ingressClassName?: string;

  /** A list of host rules used to configure the Ingress. If unspecified, or no rule matches, all traffic is sent to the default backend. */
  rules?: IngressRule[];

  /** TLS configuration. Currently the Ingress only supports a single TLS port, 443. If multiple members of this list specify different hosts, they will be multiplexed on the same port according to the hostname specified through the SNI TLS extension, if the ingress controller fulfilling the ingress supports SNI. */
  tls?: IngressTLS[];
};

/** IngressStatus describe the current state of the Ingress. */
export type IngressStatus = {
  /** LoadBalancer contains the current status of the load-balancer. */
  loadBalancer?: LoadBalancerStatus;
};

/** IngressTLS describes the transport layer security associated with an Ingress. */
export type IngressTLS = {
  /** Hosts are a list of hosts included in the TLS certificate. The values in this list must match the names used in the tlsSecret. Defaults to the wildcard host setting for the loadbalancer controller fulfilling this Ingress, if left unspecified. */
  hosts?: string[];

  /** SecretName is the name of the secret used to terminate SSL traffic on 443. Field is left optional to allow SSL routing based on SNI hostname alone. If the SNI host in a listener conflicts with the "Host" header field used by an IngressRule, the SNI host is used for termination and value of the Host header is used for routing. */
  secretName?: string;
};
