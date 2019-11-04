import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    host: {
        '[class.collapsed]': 'collapsed'
    }
})
export class SidebarComponent implements OnInit {

    collapsed = false;

   getSize() {
        if (this.collapsed === true) {
            return '5px';
        }
    }

    changeCollapsed() {
        this.collapsed = !this.collapsed;
        console.log(this.collapsed);
    }

    constructor() {
    }

    ngOnInit() {
    }

}
