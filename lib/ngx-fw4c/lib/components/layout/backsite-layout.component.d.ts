import { OnInit, AfterViewInit } from "@angular/core";
import { DefaultLayoutService } from './layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AggregatorService } from '../shared/services/aggregator.service';
import { NotificationDetail } from '../shared/models/notification.model';
import { MenuTab, Breadcrumb, RecommendationResponse } from '../shared/models/base.model';
import { ActionService } from '../shared/services/action.service';
import { AuthenticationService } from '../auth/auth.service';
import { UserViewModel } from '../auth/auth.model';
import { CacheService } from '../shared/services/cache.service';
import { PermisisonProvider } from '../auth/permission.provider';
import { DataService } from '../shared/services/data.service';
export declare class AdminLayoutComponent implements OnInit, AfterViewInit {
    workspaceLayoutService: DefaultLayoutService;
    route: ActivatedRoute;
    authenticationService: AuthenticationService;
    protected router: Router;
    protected actionService: ActionService;
    protected dataService: DataService;
    protected aggregatorService: AggregatorService;
    protected cacheService: CacheService;
    protected permisisonProvider: PermisisonProvider;
    notifications: NotificationDetail[];
    logo: string;
    title: string;
    menuTabs: MenuTab[];
    isModalShow: boolean;
    modalImageSrc: string;
    imageAltText: string;
    breadcrumbs: Breadcrumb[];
    breadcrumb: Breadcrumb;
    url: string;
    authUrl: string;
    setActive: boolean;
    menuType: string;
    isMobile: boolean;
    forbidden: string;
    notFound: string;
    previousPath: string;
    recommendation: RecommendationResponse;
    currentUser: UserViewModel;
    profileUrl: string;
    searchPlaceholder: string;
    constructor(workspaceLayoutService: DefaultLayoutService, route: ActivatedRoute, authenticationService: AuthenticationService, router: Router, actionService: ActionService, dataService: DataService, aggregatorService: AggregatorService, cacheService: CacheService, permisisonProvider: PermisisonProvider);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    isAuthPage(): boolean;
    closeImage(): void;
    hasForbidden(): boolean;
    changeMenu(items: Breadcrumb[]): void;
    private checkPermision;
}
